import { IState } from "../state"
import * as actionTypes from './actionTypes'
import { Client, Room } from 'colyseus'
import { actionPlayerAdd } from './actionPlayerAdd'
import { actionPlayerRemove } from './actionPlayerRemove'
import { actionUnitMoveTo } from './actionUnitMoveTo'

const actions: IActionTree<IState, Client> = {
    [actionTypes.PLAYER_ADD]:  actionPlayerAdd,
    [actionTypes.PLAYER_REMOVE]: actionPlayerRemove,
    [actionTypes.UNIT_MOVE_TO]: actionUnitMoveTo
}
export default actions

export interface IActionTree<S, R> {
    [key: string]: Action<S, R>
}

export type Action<S, R> = (room: Room<S>, state: S, isServer: boolean, client?: R, payload?: any) => any;