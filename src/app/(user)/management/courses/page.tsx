// "use client"

// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";
import CoursesList from "@/modules/CoursesList";

// import Section from "@/modules/Section";
// import CoursesActions from "@/modules/CoursesActions";
import {coursesHeader} from "@/lib/tableHeader";
// import { addNewUserDrawerHandler } from "@/lib/handlers";
import { getCourses } from "@/lib/getData";
// import { getTheme } from "@/lib/getData";
import Content from "@/modules/Content";
import Side from "@/modules/Side";
// import Input from "@/components/Input";
// import Button from "@/components/Button";
// import Icon from "@/components/Icon";

import { useRouter } from "next/navigation"
import Toolbar from "@/modules/Toolbar";

// const headLeft = () => {
//     return (
//         <Input id="search" name="search" placeholder="Search" type="text" shade="200" iconAfter={<Icon value="magnifying-glass" />} variant="solid" />
//     )
// }

// const headRight = async () => {
//     "use client"
//     const router = useRouter();

//     return (
//         <>
//             <Button type="button" size="medium" content="icon" shade="200" onClick={() => router.push('/management/courses/new')} ><Icon value="plus" /></Button>
//             <Button type="button" size="medium" content="icon" variant="neutral" status="neutral" shade="100" ><Icon value="filter" /></Button>
//         </>
//     )
// }

const Courses = async () => {
    // const session = await getServerSession(authOptions);
    const courses = await getCourses();
    const coursesData = await courses.json()


    // if (!session) {
    //     redirect('/auth/login?callbackUrl=/courses')
    // }
    // console.log(session)
    console.log("Courses: ", coursesData)

    return (
        <Content>
            {/* <Content.Header>
                <CoursesActions />
            </Content.Header> */}
            <Content.Header>
                <Toolbar />
            </Content.Header>
            <Content.Body orient="horizontal" leftWidth="1fr" rightWidth="300px">
                <CoursesList dataHeading={coursesHeader} dataBody={coursesData} />
                <Side>
                    bla bla balasdfasdf
                </Side>
            </Content.Body>
        </Content>
    )
}

export default Courses