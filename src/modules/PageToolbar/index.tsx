import sx from '../../styles/modules.module.scss'

const PageToolbar = ({ children, left, right }: any) => {
    return (
        <div className={sx["toolbar"]}>
            <div className={sx["toolbar-left"]}>{left}</div>
            {children}
            <div className={sx["toolbar-right"]}>{right}</div>
        </div>
    )
}


export default PageToolbar