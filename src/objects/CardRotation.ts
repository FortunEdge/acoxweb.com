class CardRotation {
    // Decimal, between -1 and 1, that represents the amount of maxRotation to turn the card on the X axis
    x: number = 0
    // Decimal, between -1 and 1, that represents the amount of maxRotation to turn the card on the Y axis
    y: number = 0
    // Decimal, between -1 and 1, that represents the amount of maxRotation to turn the card on the Z axis
    z: number = 0
    // CSS representation for the transform property, of the X rotation
    xRotation?: string
    // CSS representation for the transform property, of the Y rotation
    yRotation?: string
    // CSS representation for the transform property, of the Z rotation
    zRotation?: string
    // Maximum number of degrees to 
    maxRotationDeg: number

    constructor(x?: number, y?: number, z?: number, maxRotation: number = 10) {
        this.x = x ?? 0
        this.y = y ?? 0
        this.z = z ?? 0
        this.maxRotationDeg = maxRotation

        this.genXRotation()
        this.genYRotation()
        this.genZRotation()
    }

    genXRotation() {
        const angle = this.calculateAngle(this.x, this.maxRotationDeg)
        this.xRotation = `rotateX(${angle}deg)`
    }

    genYRotation() {
        const angle = this.calculateAngle(this.y, this.maxRotationDeg)
        this.yRotation = `rotateY(${angle}deg)`
    }

    genZRotation() {
        const angle = this.calculateAngle(this.z, this.maxRotationDeg)
        this.zRotation = `rotateZ(${angle}deg)`
    }

    calculateAngle(fraction: number, max: number) {
        return Math.round((fraction * max) * 100) / 100
    }

    getString() {
        return `rotate3d(${this?.x}, ${this?.y}, ${this?.z}, ${this?.maxRotationDeg}deg)`
    }
}

export default CardRotation