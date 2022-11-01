import { ReactNode } from "react"

type Props = {
    onClick(): void
    children: ReactNode
}

function Button({ onClick, children }: Props) {
    return (
        <button className="bg-primary text-contrast w-full text-lg flex gap-4 justify-center items-center px-6 py-2 cursor-pointer h-fit" onClick={onClick}>
            {children}
        </button>
    )
}

export default Button