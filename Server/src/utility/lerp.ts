export function lerp(currentPosition: number, targetPosition: number, t: number): number {
    return currentPosition + t * (targetPosition - currentPosition)
 }