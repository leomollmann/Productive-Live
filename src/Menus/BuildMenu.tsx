import { PumpCard, PumpMasterCard } from "../Objects/Pump/PumpCard"
import { ToolOutlined, CloseOutlined } from '@ant-design/icons'
import { ReactNode, useEffect, useState } from "react"
import { ReservatoryCard, ReservatoryMasterCard } from "../Objects/Reservatory/ReservatoryCard"
import { GameState } from ".."

type Props = {
    close(): void
}

const cards = [
    { card: PumpCard, master: PumpMasterCard },
    { card: ReservatoryCard, master: ReservatoryMasterCard }
] 

function BuildMenu({ close }: Props) {
    const [MasterCard, setCard] = useState<ReactNode>()

    useEffect(() => {
      const state = GameState.getState()
      if(!state.tutorial[0].done) {
        state.tutorial[0].done = true
        GameState.notify()
      }
    }, [])

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
                    <section className="flex bg-white shadow p-2 w-[500px] shrink-0 details-card">
                        {MasterCard || (
                            <h2 className="text-2xl text-gray-2 m-auto">Select a Building</h2>
                        )}
                    </section>
                </div>
            </div>
        </div> 
    )
}

export default BuildMenu