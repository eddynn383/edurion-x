import { newCatalogAction } from "@/actions/serverActions"
import { Button, FormServer, Input, Textarea } from "@/components"
import { Content, Section } from "@/modules"

const Page = () => {
    return (
        <Content>
            <Content.Header>
                
            </Content.Header>
            <Content.Body orient="vertical" leftWidth="1fr" rightWidth="300px">
                <Section>   
                    <Section.Content>
                        <FormServer action={newCatalogAction}>
                            <Input type="text" id="catalog-title" name="title" />
                            <Textarea id="catalog-description" name="description" type="text" rows={4} columns={10} allowResize={"both"} />
                            <Button type="submit" size="M">Create new catalog</Button>
                        </FormServer> 
                    </Section.Content>
                </Section>
            </Content.Body>
        </Content>
    )
}

export default Page