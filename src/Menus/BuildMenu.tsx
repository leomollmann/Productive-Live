import { PumpCard, PumpMasterCard } from "../Objects/Pump/PumpCard"
import { ToolOutlined, CloseOutlined } from '@ant-design/icons'
import { ReactNode, useState } from "react"

type Props = {
    close(): void
}

const cards = [
    { card: PumpCard, master: PumpMasterCard }
] 

function BuildMenu({ close }: Props) {
    const [MasterCard, setCard] = useState<ReactNode>()

    return (
        <div className="menu p-8">
            <div className="p-4 w-full h-full bg-[#fffc] shadow max-w-6xl flex flex-col gap-4">
                <h1 className="font-bold text-2xl text-gray-6 flex items-center gap-3">Build Menu <ToolOutlined /></h1>
                <CloseOutlined onClick={close}/>
                <div className="flex gap-4">
                    <section className="flex flex-wrap">
                        {cards.map((x, i) => 
                            <span key={i} onClick={() => setCard(<x.master close={close}/>)}>
                                <x.card />
                            </span>
                        )}
                    </section>
                    {MasterCard}
                </div>
            </div>
        </div> 
    )
}

export default BuildMenu