import { PumpCard, PumpMasterCard } from "../Objects/Pump/PumpCard"
import { ToolOutlined, CloseOutlined } from '@ant-design/icons'
import { ReactNode, useState } from "react"
import { ReservatoryCard, ReservatoryMasterCard } from "../Objects/Reservatory/ReservatoryCard"

type Props = {
    close(): void
}

const cards = [
    { card: PumpCard, master: PumpMasterCard },
    { card: ReservatoryCard, master: ReservatoryMasterCard }
] 

function BuildMenu({ close }: Props) {
    const [MasterCard, setCard] = useState<ReactNode>()

    return (
        <div className="menu p-8">
            <div className="p-4 w-full h-full bg-[#fffc] shadow max-w-6xl flex flex-col gap-4 relative">
                <h1 className="font-bold text-2xl text-gray-6 flex items-center gap-3">Build Menu <ToolOutlined /></h1>
                <CloseOutlined className="absolute right-4 top-4 cursor-pointer text-2xl" onClick={close}/>
                <div className="flex gap-4 h-full">
                    <section className="flex flex-wrap gap-2 w-full">
                        {cards.map((x, i) => 
                            <span key={i} onClick={() => setCard(<x.master close={close}/>)}>
                                <x.card />
                            </span>
                        )}
                    </section>
                    <section className="flex bg-white shadow p-2 w-[500px] shrink-0 h-full">
                        <PumpMasterCard />
                    </section>
                </div>
            </div>
        </div> 
    )
}

export default BuildMenu