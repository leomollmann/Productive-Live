type Props = {
    close(): void 
}

function MainMenu({ close }: Props) {
    return (
        <div className="menu dark">
            <div id="title">Productive</div>
            <button id="play" onClick={close}>Resume</button>
            <div id="instructions">
                <span>Move: WASD</span>
                <span>Up: SPACE</span>
                <span>Down: Left Shift</span>
                <span>Look: Mouse</span>
            </div>
        </div> 
    )
}

export default MainMenu