import { Suspense } from 'react';

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";

import useRoleValidation from '@/hooks/useRoleValidation';
import { getPages, getUserPreferences } from '@/lib/getData';
import { Theme } from "@/interfaces/global";
import { Header, Main } from '@/modules';
import { Badge, Button, Icon, Logo, Menu, MenuSkeleton, PageTitle, Profile, ProfileSkeleton } from '@/components';
import sx from "@/styles/layout.module.scss";

interface IPropsUserLayout {
    children: React.ReactNode;
    catalog: any;
}

export default async function UserLayout({ children }: IPropsUserLayout) {
    const session = await getServerSession(options)
    const prefs = await getUserPreferences()
    const theme = prefs?.themeMode as Theme
    const [isSuccess] = await useRoleValidation(["ADMIN"])
    const pagesData = await getPages()

    return (
        <div className={sx["main"]}>
            <div className={sx["left"]}>
                <div className={sx["inner"]}>
                    <div className={sx["logo"]}>
                        <Logo alt="Edurion Logo" theme={theme} />
                    </div>
                    <div className={sx["menu"]}>
                        <Suspense fallback={<MenuSkeleton />}>
                            {pagesData && <Menu data={pagesData} />}
                        </Suspense>
                    </div>
                </div>
            </div>
            <div className={sx["right"]}>
                <div className={sx["inner"]}>
                    <Header>
                        <Header.Left>
                            <PageTitle />
                        </Header.Left>
                        <Header.Right>
                            {isSuccess && <Button type="button" mode="primary" variant="solid" status="accent" size="M" content="text" >Create</Button>}
                            <Button type="button" mode="secondary" variant="solid" status="accent" shade="150" size="M" content="icon" >
                                <>
                                    <Icon value="comment" />
                                    <Badge value={55} max={50} size="medium" />
                                </>
                            </Button>
                            <Button type="button" mode="secondary" variant="solid" status="accent" shade="150" size="M" content="icon"  >
                                <>
                                    <Icon value="bell" />
                                    <Badge value={1} size="small" />
                                </>
                            </Button>
                            <Suspense fallback={<ProfileSkeleton />}>
                                <Profile id="profile-1" size="M" sessionData={session}/>
                            </Suspense>
                        </Header.Right>
                    </Header>
                    <Main>
                        <Suspense fallback={<p>Loading...</p>}>
                            {children}
                        </Suspense>
                    </Main>
                </div>
            </div>
        </div>
    )
}