import { Schema, type } from "@colyseus/schema"

import { StatePlayers, IStatePlayers } from "./statePlayers"
import { StateUnits, IStateUnits } from "./stateUnits"

export class State extends Schema implements IState {
    @type(StatePlayers) public statePlayers: IStatePlayers = new StatePlayers()
    @type(StateUnits) public stateUnits: IStateUnits = new StateUnits()
}

export interface IState extends Schema {
    statePlayers: IStatePlayers
    stateUnits: IStateUnits
}