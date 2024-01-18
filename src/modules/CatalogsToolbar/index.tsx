"use client"

import { newCatalogAction } from "@/actions/serverActions"
import { Button, FormServer, Icon, Input, Link, Modal, Textarea } from "@/components"
import { useRouter } from "next/navigation"
import { useState } from "react"


const CatalogsToolbar = () => {
    const router = useRouter()
    const [modalState, setModalState] = useState(false)
    return (
        <>
            <Button type="button" size="M" content="icon" onClick={() => setModalState(true)}><Icon value="plus" /></Button>
            
            {/* <Modal state={modalState ? 'open' : 'close'}>
                <FormServer action={newCatalogAction}>
                    <Input type="text" id="catalog-title" name="title" />
                    <Textarea id="catalog-description" name="description" type="text" rows={4} columns={10} allowResize={"both"} />
                    <Button type="submit" size="M">Create new catalog</Button>
                </FormServer> 
            </Modal> */}
        </>
    )
}

export default CatalogsToolbar