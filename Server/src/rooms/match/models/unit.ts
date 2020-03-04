import shortid from 'shortid'
import BigNumber from "bignumber.js"
import { Schema, type } from '@colyseus/schema'
import { Position } from './position'
import utility from '../../../utility'


export class Unit extends Schema {
    @type('string') public id: string
    @type(Position) public position: Position
    @type('number') public moveSpeed: number

    public moveTo: Position[] = [];

    constructor (id?: string) {
        super();
        this.id = id || shortid.generate()
    }

    public setMoveTo (path: Position[]) {
        this.moveTo = path
        console.log('Set Path', JSON.stringify(path))
    }

    update(deltaTime: number) {
        this.moveUnit(deltaTime)
    }

    moveUnit (deltaTime: number): void {
        if(!this.moveTo.length) return
        const destination = this.moveTo[0]

        const distance = utility.distanceBetween(this.position.x, this.position.z, destination.x, destination.z)
        const isEntityAtDestination = distance == 0
    
        if (isEntityAtDestination) {
            this.moveTo.shift()
            if (!this.moveTo.length) return

            // calls itself till nothing is left in the moveTo array
            this.moveUnit(deltaTime)
            return
        }
    
        const moveSpeedPerSec = new BigNumber(this.moveSpeed).dividedBy(60).toNumber()
        const distanceToTravel = new BigNumber(moveSpeedPerSec).dividedBy(1000).multipliedBy(deltaTime).toNumber()
        const t = utility.clamp(new BigNumber(distanceToTravel).dividedBy(distance).toNumber(), 0, 1)
        this.position.x = utility.lerp(this.position.x, destination.x, t)
        this.position.z = utility.lerp(this.position.z, destination.z, t)
    }

    static generate (): Unit {
        const unit = new Unit()
        unit.position = new Position(10, 0, 10)
        unit.moveSpeed = 50

        return unit;
    }
}