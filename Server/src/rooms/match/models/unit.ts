import shortid from 'shortid'
import { Schema, type } from '@colyseus/schema'
import { Position } from './position'

export class Unit extends Schema {
    @type('string') public id: string
    @type(Position) public position: Position

    constructor (id?: string) {
        super();
        this.id = id || shortid.generate()
    }

    update(currentTime?: number) {
        /* update Unit stuff */
    }
}