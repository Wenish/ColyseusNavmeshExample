import BigNumber from "bignumber.js"

export function distanceBetween(currentPostionX: number, currentPostionY: number, targetPositionX: number, targetPositionY: number): number {
    var a = new BigNumber(currentPostionX).minus(targetPositionX)
    var b = new BigNumber(currentPostionY).minus(targetPositionY)
    var aProduct = a.multipliedBy(a)
    var bProduct = b.multipliedBy(b)
    var abSum = aProduct.plus(bProduct)
    var distance = abSum.sqrt().toNumber()
    return distance
}