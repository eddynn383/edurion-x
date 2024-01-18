export interface IPropsForm {
    id?: string;
    cn?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    action?: (data: any) => void;
    onSubmit?: (data: any) => void;
}