import { Providers } from "./providers";
import { getUserPreferences } from "@/lib/getData";
import "@/styles/globals.scss"

interface IPropsRootLayout {
    children: React.ReactNode;
}

export const metadata = {
    title: "Edurion",
    description: "Learn your limits",
};

export default async function RootLayout({children}: IPropsRootLayout) {
    const prefs = await getUserPreferences()
    const theme = prefs?.themeMode
    
    console.log("THEME in ROOT:", theme)
    return (
        <html lang="en" data-theme={theme ? theme : "light"}>
            <body>
                <Providers>
                    {children}
                </Providers>
                <div id="drawer-root"></div>
            </body>
        </html>
    );
}
