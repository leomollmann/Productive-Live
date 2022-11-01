/** Abstraction of a liquid pipe. Does not care about the shape of the pipe
 *  nor the height that is placed, we only care about the change in pressure
 *  from point A to B
 * 
 * - Parameters
 * @property {number} capacity - maximum quantity of liquid
 * @property {number} gain - pressure gain from A to B, positive if the pipe goes downward, negative it the pipe is going upward
 * @property {number} gauge - radius of the pipe
 * @property {number} area - computed from gauge
 * 
 * - Simulated
 * @property {number} pressue - current pressure of the liquid
 * @property {number} buffer - current quantity of liquid
 * 
 * - Configuration
 * @property {LiquidConnection} a - connected to A
 * @property {LiquidConnection} b - connected to B
 */

class LiquidPipe {
    public capacity: number
    public gain: number
    public gauge: number
    public area: number
    public pressure: number = 0
    public buffer: number = 0
    public connections: LiquidPipe[] = []
    private limit = 2

    constructor(capacity: number, gain: number, gauge: number) {
        this.capacity = capacity
        this.gain = gain
        this.gauge = gauge
        this.area = gauge * gauge * Math.PI
    }

    setBuffer(buffer: number) {
        this.buffer = buffer
        this.pressure = this.buffer
    }

    addConnection(pipe: LiquidPipe) {
        
    }
}

export default LiquidPipe