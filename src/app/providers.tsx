"use client";

import { ThemeProvider } from "next-themes";
import { useTheme } from "next-themes";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { config } from "@fortawesome/fontawesome-svg-core";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

// declare module 'next-auth' {
//     interface User {
//         id: string;
//         name: string;
//         email: string;
//         image: string;
//         imageLarge: string;
//         roles: string[];
//     }

//     interface Session {
//         user: User;
//     }
// }

export function Providers({ children, session }: any) {
    library.add(fas)
    const { resolvedTheme: theme } = useTheme()

    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}