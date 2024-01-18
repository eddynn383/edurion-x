import Section from "@/modules/Section";
import Content from "@/modules/Content";
import { getCourse } from "@/lib/getData";

const Page = async ({ params: { id } }: { params: { id: string } }) => {

    const course = await getCourse(id)

    return (
        <Content>
            <Content.Body>
                <Section>
                    <h2>Course no. {id}</h2>
                    <p>
                        {course?.title}
                    </p>
                    <p>
                        {course?.description}
                    </p>
                </Section>
            </Content.Body>
        </Content>
    )
}

export default Page