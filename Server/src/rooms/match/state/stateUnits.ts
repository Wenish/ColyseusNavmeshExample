import { Schema, type, MapSchema } from "@colyseus/schema"
import { Unit } from '../models/unit'

export class StateUnits extends Schema implements IStateUnits {
    @type({ map: Unit })
    public units: MapSchema<Unit> = new MapSchema<Unit>();
    
    public addUnit (unit: Unit): void {
        this.units[unit.id] = unit
        console.log('added unit')
    }

    public removeUnit (idUnit: string): void {
        delete this.units[idUnit]
        console.log('removed unit')
    }
}

export interface IStateUnits extends Schema {
    units: MapSchema<Unit>

    addUnit (unit: Unit): void
    removeUnit (idUnit: string): void
}