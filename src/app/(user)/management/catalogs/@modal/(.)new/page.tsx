import { newCatalogAction } from "@/actions/serverActions";
import { Button, FormServer, Input, InputGroup, Label, Modal2, Textarea } from "@/components";

export default function NewModal() {


    return (
        <Modal2>
            <h2>BLa bla bla</h2>
            <FormServer action={newCatalogAction}>
                <InputGroup>
                    <Label htmlFor="catalog-title">Title</Label>
                    <Input type="text" id="catalog-title" name="title" />
                </InputGroup>
                <InputGroup>
                    <Label htmlFor="catalog-description">Description</Label>
                    <Textarea id="catalog-description" name="description" type="text" rows={4} columns={10} allowResize={"both"} />
                </InputGroup>
                <Button type="submit" size="M">Create new catalog</Button>
            </FormServer>
        </Modal2>
    )
}