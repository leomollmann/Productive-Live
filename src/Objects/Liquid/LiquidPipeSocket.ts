class LiquidPipeSocket {
    public hasLiquid: boolean = false
    public connectedTo: any
    public height: number
    public gauge: number
    public name: string

    constructor(height: number, gauge: number, name: string) {
        this.height = height
        this.gauge = gauge
        this.name = name
    }
}

export default LiquidPipeSocket