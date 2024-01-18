"use server"

import { IPropsForm } from "./interface";
import sx from "@/styles/component.module.scss";

const FormServer = ({ cn, id, style, children, action }: IPropsForm) => {
    return (
        <form className={cn ? cn : sx["form"]} id={id} style={style} action={action}>{children}</form>
    )
}

export default FormServer