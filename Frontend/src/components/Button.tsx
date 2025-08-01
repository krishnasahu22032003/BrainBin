export interface ButtonProps {
    variant: "primary" | "secondary",
    size: "sm" | "md" | "lg" | "xl" | "2xl",
    text: string,
    icon?: any,
    onClick: () => void

}

export const Button = (props: ButtonProps) => {
    return <button></button>
}
<Button variant="primary" size="md" text="krishna"  onClick={()=>{}}/>