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

    static generate (): Unit {
        const unit = new Unit()
        unit.position = new Position(10, 0, 10)

        return unit;
    }
}