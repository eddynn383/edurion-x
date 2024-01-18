import { AuthOptions } from "next-auth";

import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prismadb";
import { compare } from "bcrypt"

import theme from "@/lib/theme.json";

if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("Please provide process.env.NEXTAUTH_SECRET");
}

const googleClientId = process.env.GOOGLE_CLIENT_ID as string;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
const githubClientId = process.env.GITHUB_ID as string;
const githubClientSecret = process.env.GITHUB_SECRET as string;

if (!googleClientId || !googleClientSecret || !githubClientId || !githubClientSecret) {
    throw new Error("Required environment variables are missing");
}

export const options: AuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({

            clientId: googleClientId,
            clientSecret: googleClientSecret,
            profile(profile) {
                console.log("GoogleProvider's: ", profile)
                const img = profile.picture
                const lgImg = img.split("=")[0] + "=s1080-c"
                // const roles: string[] = ["LEARNERS"]
                return ({
                    id: profile.sub,
                    name: `${profile.given_name} ${profile.family_name}`,
                    image: profile.picture,
                    imageLarge: lgImg,
                    role: profile.role ? profile.role : 'user',
                    email: profile.email
                })
            },
        }),
        GithubProvider({
            // profile(profile: GithubProfile) {
            //     console.log("GithubProfile's: ", profile)
            //     const roles: string[] = ["LEARNERS"]
            //     return {
            //         ...profile,
            //         id: profile.id.toString(),
            //         image: profile.avatar_url,
            //         imageLarge: profile.image_large,
            //         roles
            //     }
            // },
            clientId: githubClientId,
            clientSecret: githubClientSecret,
            profile(profile: GithubProfile) {
                console.log("GithubProfile's: ", profile)
                return {
                    id: profile.id.toString(),
                    image: profile.avatar_url,
                    imageLarge: profile.image_large,
                    role: profile.role ? profile.role : 'user',
                    email: profile.email
                }
            },
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "example@email.com",
                },
                password: {
                    label: "Password",
                    type: "password",
                }
            },
            async authorize(credentials) {

                if (!credentials) {
                    throw new Error("No creadentials provided!")
                }

                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user) {
                    throw new Error("No user found");
                    // return false
                }

                if (user.password === null) {
                    throw new Error("User password is null");
                    // return false
                }

                const passwordValid = compare(credentials.password, user.password);

                if (!passwordValid) {
                    throw new Error("Invalid password");
                    // return false
                }

                return user
            },
        }),
    ],
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: "/account/login",
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            const smallAvatar = user.image
            let largeAvatar;

            if (account?.provider === 'google') {
                largeAvatar = smallAvatar?.split('=')[0] + "=s256"
            } else {
                largeAvatar = smallAvatar
            }

            console.log("UC: ", user)
            console.log("PC: ", profile)
            console.log("AC: ", account)

            const email: any = user?.email

            console.log("EMAIL", email)

            const existingUser = await prisma.user.findUnique({
                where: {
                    email
                }
            });

            console.log("USER EXISTS? ", existingUser)

            if (!existingUser) {
                const newUser = await prisma.user.create({
                    data: {
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        imageLarge: largeAvatar, // Modify the image URL for larger size
                    },
                })

                if (account) {
                    await prisma.account.create({
                        data: {
                            type: account.type,
                            provider: account.provider,
                            providerAccountId: account.providerAccountId,
                            access_token: account.access_token,
                            expires_at: account.expires_at,
                            scope: account.scope,
                            token_type: account.token_type,
                            id_token: account.id_token,
                            user: {
                                connect: {
                                    id: newUser.id,
                                }
                            },

                        }
                    })
                }

                await prisma.profile.create({
                    data: {
                        user: {
                            connect: {
                                email: profile?.email
                            }
                        },
                        avatar: largeAvatar,
                        // name: profile?.family_name,
                        firstname: profile?.family_name,
                        lastname: profile?.given_name
                    }
                })

                await prisma.userPreferences.create({
                    data: {
                        themeMode: "light",
                        theme: {
                            create: {
                                defaultStyle: {
                                    light: theme.light,
                                    dark: theme.dark
                                },
                                customStyles: {},
                            },
                        },
                        user: {
                            connect: {
                                id: newUser.id,
                            }
                        },
                        paymentMethods: "{}",
                    }
                });
            }

            return Promise.resolve(true);
        },
        // async jwt({ token, user, profile }) {
        //     console.log("JWT Token before:", token)
        //     // console.log("User before:", user)
        //     // console.log("Profile before:", profile)
        //     if (user) {
        //         const u = user as unknown as any;
        //         return {
        //             ...token,
        //             id: u.id,
        //             imageLarge: u.imageLarge,
        //             roles: u.roles
        //         }
        //     }
        //     // console.log("Profile after:", profile)
        //     console.log("JWT Token after:", token)
        //     return token;
        // },
        // async session({ session, token }) {
        //     // console.log("Session before:", session)
        //     console.log("Sess Token before:", token)

        //     const sessionData = {
        //         ...session,
        //         user: {
        //             ...session.user,
        //             id: token.id,
        //             imageLarge: token.imageLarge,
        //             roles: token.roles
        //         }
        //     }

        //     // console.log("Session after:", sessionData)
        //     console.log("Sess Token after:", token)
        //     return sessionData
        // },
        async jwt({ token, user }) {
            console.log("USER", user)
            console.log("jwt", {...token, ...user})
            return {...token, ...user };
        },
        async session({ session, token }) {
            const sessionData = {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    // imageLarge: token.imageLarge,
                    role: token.role
                }
            }
            return sessionData
        },
        // async redirect({url, baseUrl}) {
        //     console.log("url: ", url)
        //     console.log("baseUrl: ", baseUrl)
        //     return baseUrl
        // }
    },
    // debug: process.env.NODE_ENV === "development",
    // jwt: {
    //     secret: process.env.NEXTAUTH_JWT_SECRET,
    // },
    // secret: process.env.NEXTAUTH_SECRET,
}