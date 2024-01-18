import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Content from "@/modules/Content";
import Card from "@/components/Card";
import {CardSkeleton} from "@/components/Skeleton";
import { getCoursePrice, getCourseRating, getCourses, getUser } from "@/lib/getData";

import { Suspense } from "react";
import useRoleValidation from "@/hooks/useRoleValidation";
import { headers } from 'next/headers'
import sx from "@/styles/page.module.scss";

const Catalog = async ({ layout }: any) => {
    const session = await getServerSession(options)
    const courses = await getCourses()
    const coursesData = await courses.json()
    const [isSuccess] = await useRoleValidation(["ADMIN"])


    const headersList = headers()
    const referer = headersList.get('referer')

    console.log("LINK: ", referer)

    console.log(isSuccess)
    console.log("SESSION: ", session)

    

    return (
        <Content>
            <Content.Body orient="vertical">
                <div className={sx["catalog-cards"]}>
                    {
                        
                        coursesData.map(async (course: any, idx: any) => {
                            const price = await getCoursePrice(course.priceId);
                            const rating = await getCourseRating(course.ratingId);
                            const instructor = await getUser(course.instructorId);

                            console.log("Catalog Price: ", price)
                            console.log("Catalog Rating: ", rating)
                            console.log("Catalog Instructor: ", instructor)

                            return (
                                <Suspense key={idx} fallback={<CardSkeleton />}>
                                    <Card data={course} price={price} rating={rating} instructor={instructor} />
                                </Suspense>
                            )
                        })
                    }
                </div>
            </Content.Body>
        </Content>
    )
}

export default Catalog;