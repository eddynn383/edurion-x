import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            name: string,
            image: string,
            imageLarge: string,
            email: string,
            role: string,
        } & DefaultSession
    }

    interface Profile extends Profile {
        imageLarge?: string,
        given_name?: string,
        family_name?: string
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role: string,
        imageLarge: string,
    }
}