import { Button, Drawer, FormServer, Icon, Input, Link, Textarea } from "@/components";
import {Content, CoursesList,Toolbar, Side, Section} from "@/modules";
import {coursesHeader} from "@/lib/tableHeader";
import { getCourses, getCatalogs } from "@/lib/getData";
import { setCatalog } from "@/lib/setData";
import { revalidateTag } from "next/cache";
import { deleteCatalogAction, newCatalogAction } from "@/actions/serverActions";
import { deleteCatalog } from "@/lib/removeData";
import { redirect } from "next/navigation";
import CatalogsToolbar from "@/modules/CatalogsToolbar";

interface Catalogs {
    title: string;
    description: string;
}



const Catalogs = async () => {

    const catalogs = await getCatalogs();

    return (
        <>
            {/* <form action={newCatalog}>
                <Input type="text" id="catalog-title" name="title" />
                <Textarea id="catalog-description" name="description" type="text" rows={4} columns={10} allowResize={"both"} />
                <Button type="button" size="M">Create new catalog</Button>
            </form> */}
            <Content>
                <Content.Header>
                    {/* <Toolbar /> */}
                    
                    {/* <CatalogsToolbar /> */}
                    <Link href={`/management/catalogs/new`} ><Icon value="add"/></Link>
                </Content.Header>
                <Content.Body orient="vertical" leftWidth="1fr" rightWidth="300px">
                    <Section>   
                        <Section.Content>
                            <ul style={{"listStyle": "none", "display": "inline-grid", "gap": "var(--gap-200, 8px)"}}>
                                {
                                    catalogs.map((item: any, idx: any) => (
                                        <li key={idx} style={{"display": "grid", "gridTemplateColumns": "1fr 1fr auto", "gap": "var(--gap-300, 12px)", "backgroundColor": "var(--background-color-150)", "padding": "var(--padding-300)", "borderRadius": "var(--border-radius-200, 8px)"}}>
                                            <span style={{"display": "grid", "gap": "var(--gap-100, 4px)"}}>
                                                <span style={{"color": "var(--text-color-600)", "fontSize": "var(--font-size-200)", "textTransform": "uppercase"}}>Title:</span>
                                                <span>{item.title}</span>
                                            </span>
                                            <span style={{"display": "grid", "gap": "var(--gap-100, 4px)"}}>
                                                <span style={{"color": "var(--text-color-600)", "fontSize": "var(--font-size-200)", "textTransform": "uppercase"}}>Desc:</span>
                                                <span>{item.description}</span>
                                            </span>
                                            <FormServer action={deleteCatalogAction}>
                                                <Button type="submit" size="S" content="icon" status="fail" value={item.id} name="id"><Icon value="trash" /></Button>
                                            </FormServer>
                                        </li>
                                    ))
                                }
                            </ul>
                            
                        </Section.Content>
                    </Section>
                    {/* <CoursesList dataHeading={coursesHeader} dataBody={courses} /> */}
                </Content.Body>
            </Content>
            {/* <Drawer state={state} onClickOutside={() => onStateUpdate("close")} width="500px" >

            </Drawer> */}
        </>
    )
}

export default Catalogs