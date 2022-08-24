import { getFloorContactPoint } from "../Engine/loop"
import { scene } from "../Engine/scene"

export function buildObject(object: THREE.Object3D) {
    const intersection = getFloorContactPoint()
    if(intersection) {
        object.position.set(intersection.point.x, intersection.point.y, intersection.point.z)
        scene.add(object)
    }
}