"use server"

import { deleteCatalog } from "@/lib/removeData";
import { setCatalog } from "@/lib/setData";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const newCatalogAction = async (e: FormData) => {
    const title = e.get("title")?.toString();
    const desc = e.get("description")?.toString();

    if (!title || !desc) return;
    
    const newCatalog = {
        title: title,
        description: desc
    }

    await setCatalog(newCatalog)
    
    revalidateTag('catalogs')
    // revalidatePath('/catalogs')
    
    e.set('title', '')
    e.set('description', '')
    
    console.log(e)

    redirect('/management/catalogs')

}

export const deleteCatalogAction = async (e: FormData) => {
    console.log("it works!@@@")
    const id = e.get("id")?.toString()
    console.log(id)
    if(!id) return
    await deleteCatalog(id)
    revalidateTag('catalogs')
}