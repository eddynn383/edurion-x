interface IPropsLayoutCatalogs {
    children: React.ReactNode,
    modal: React.ReactNode
}

export default function LayoutCatalogs(props: IPropsLayoutCatalogs) {
    return (
        <>
            {props.children}
            {props.modal}
        </>
    )
}