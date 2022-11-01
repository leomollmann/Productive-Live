import LiquidPipeSocket from "../Objects/Liquid/LiquidPipeSocket"
import { CubeLiquidStorage } from "../Objects/Liquid/LiquidStorage"

test('Liquid Storage', () => {
    let s = new CubeLiquidStorage(10, [
        new LiquidPipeSocket(0, 1, 'bottom'),
        new LiquidPipeSocket(5, 1, 'center'),
        new LiquidPipeSocket(10, 1, 'top')
    ])
    s.amount = 1000
    s.updateSockets()

    const pressureBottom = s.getPressure(s.sockets.get('bottom')!)
    const pressureCenter = s.getPressure(s.sockets.get('center')!)
    const pressureTop = s.getPressure(s.sockets.get('top')!)

    expect(pressureBottom).toBeCloseTo(10)
    expect(pressureCenter).toBeCloseTo(5)
    expect(pressureTop).toBeCloseTo(0)
})

test('Pipe static flow', () => {

})