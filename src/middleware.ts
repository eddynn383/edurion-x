import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// export default withAuth(
//     function middleware(request: NextRequestWithAuth) {
//         console.log("pathname's: ", request)
//         console.log("url's: ", request.url)
//         console.log("token's: ", request.nextauth.token)

//         const token = request.nextauth.token

//         console.log("STARTS WITH: ", request.nextUrl.pathname.startsWith("/learning-area"))

//         if (request.nextUrl.pathname.startsWith("/management") && token?.role !== "admin") {
//             console.log("is true")
//             return NextResponse.redirect(new URL("/unauthorized", request.url)) // Redirect to unauthorized page
//         }

//         // return NextResponse.next() // Redirect to unauthorized page
//     },
//     {
//         pages: {
//             signIn: '/account/login',
//             error: '/unauthorized'
//         },
//         callbacks: {
//             authorized: ({ req, token }) => {
//                 // console.log("REQQ: ", req);
//                 // console.log("TOKEN IN MIDDLEWARE: ", token)
//                 // if (!token) return false

//                 // const userRole = token?.role as string; // Perform type assertion to string[]
//                 // const pageRole = ["ADMIN", "LEARNER"]

//                 // const isValid = pageRole.some((role: any) => userRole.includes(role))
//                 // console.log("IS VALID: ", isValid)

//                 if (req.nextUrl.pathname.startsWith("/management")) return token?.role === "admin";

//                 return !!token;
//             }
//         }
//     }
// )

export default withAuth((req) => {
    if (req.nextUrl.pathname.startsWith("/management")) {
        if (req.nextauth.token?.role !== "admin") {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
    }
});

export const config = {
    matcher: ["/((?!account|api|_next/static|_next/image|favicon.ico).*)"]
};
