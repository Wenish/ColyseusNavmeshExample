import { Schema, type } from '@colyseus/schema'

export class Player extends Schema {
    @type('string') public id: string
    @type('string') public idUnit: string

    constructor (id: string) {
        super();
        this.id = id
    }
}