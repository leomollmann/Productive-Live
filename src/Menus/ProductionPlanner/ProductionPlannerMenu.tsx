import Flowchart from "./Flowchart"

type Props = {
    close(): void 
}

function ProductionPlannerMenu({ close }: Props) {
    return (
        <div className="menu">
            <div className="menu-container">
                <h1>Build Menu</h1>
                <button id="play" onClick={close}>Resume</button>
            </div>
            <Flowchart />
        </div> 
    )
}

export default ProductionPlannerMenu