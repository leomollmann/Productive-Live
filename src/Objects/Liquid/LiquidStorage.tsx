import LiquidPipeSocket from "./LiquidPipeSocket"

interface LiquidStorage {
    capacity: number // m3
    amount: number // m3
    sockets: Map<string, LiquidPipeSocket>
    getPressure(socket: LiquidPipeSocket): number
}

export class CubeLiquidStorage implements LiquidStorage {
    private size
    public sockets: Map<string, LiquidPipeSocket> = new Map()
    public amount: number = 0
    public capacity: number
    
    constructor (size: number, sockets: LiquidPipeSocket[]) {
        this.size = size
        this.capacity = size * size * size

        sockets.forEach(x => {
            if(x.height > size || x.height < 0) throw new Error('Socket out of bounds')
            if(x.gauge > size) throw new Error('Socket gauge bigger than the container')
            
            this.sockets.set(x.name, x)
        })
    }

    private deltaH(height: number): number {
        return (this.amount / (this.size * this.size)) - height
    }
    
    getPressure(socket: LiquidPipeSocket): number {
        if(!socket.hasLiquid) return 0
        return Math.max(this.deltaH(socket.height), 0)
    }

    updateSockets() {
        this.sockets.forEach(x => x.hasLiquid = this.deltaH(x.height) > 0)
    }

    flow() {

    }
}