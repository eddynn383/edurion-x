"use client"

import { IPropsForm } from "./interface";
import sx from "@/styles/component.module.scss";

const FormClient = ({ cn, id, style, children, onSubmit }: IPropsForm) => {
    return (
        <form className={cn ? cn : sx["form"]} id={id} style={style} onSubmit={onSubmit}>{children}</form>
    )
}

export default FormClient