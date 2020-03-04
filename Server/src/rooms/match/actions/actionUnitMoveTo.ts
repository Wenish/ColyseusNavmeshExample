import { Action } from "../actions/index";
import { IState } from "../state";
import { Client } from "colyseus";
import { UNIT_MOVE_TO } from "./actionTypes";
import { Player } from "../models/player";
import { Unit } from "../models/unit";
import { Position } from "../models/position";

/*
{
    "ACTION_TYPE": "UNIT_MOVE_TO",
    "payload": {
        "x": 2,
        "z": 8,
        "idUnit": "nGjQqMy5"
    }
}
*/

export const actionUnitMoveTo: Action<IState, Client> = (room, state, isServer, client, payload) => {
    try {
        if(!payload) throw 'payload is not defined'
        if(!payload.x) throw 'payload.x is not defined'
        if(!payload.z) throw 'payload.z is not defined'
        if(!payload.idUnit) throw 'payload.idUnit is not defined'

        if(!isServer) {
            const player: Player = state.statePlayers.players[client.sessionId]
            if(!player) throw 'could not find player'

            if(player.idUnit != payload.idUnit) throw 'player can not move an unit from another player'
        }

        const unit: Unit = state.stateUnits.units[payload.idUnit]
        if(!unit) throw 'could not find unit'

        const destination: Position = new Position(payload.x, 0, payload.z)

        const foundPath: any = state.navMesh.findPath({ x: unit.position.x, y: unit.position.z }, { x: destination.x, y: destination.z });
        if (!foundPath || !foundPath.length) throw 'No path found'

        foundPath.shift()

        const path: Position[] = []

        foundPath.forEach(item => {
            path.push(new Position(item.x, 0, item.y))
        });
        
        unit.setMoveTo(path)
    } catch (err) {
        console.error('Error', UNIT_MOVE_TO, err)
    }
}