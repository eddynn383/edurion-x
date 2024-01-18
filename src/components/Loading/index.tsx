"use client";
import sx from "@/styles/component.module.scss";
import { IPropsLoading } from "./interface";

const Loading = ({size = "M", style}: IPropsLoading) => {

    const customAttrs = {
        "data-size": size,
    }

    return (
        <div className={sx["loading"]} {...customAttrs} style={style}>
            <span className={sx["loading-spinner"]}>Loading...</span>
        </div>

    )
}

// style="enable-background:new 0 0 50 50;"

export default Loading