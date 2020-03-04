import { Schema, type } from "@colyseus/schema";

export class Position extends Schema {
    @type('number')
    public x: number
    @type('number')
    public y: number
    @type('number')
    public z: number

    constructor (
        x: number,
        y: number,
        z: number,
    ) {
        super()
        this.x = x;
        this.y = y;
        this.z = z;
    }
}