import { Action } from "../actions/index";
import { IState } from "../state";
import { Client } from "colyseus";
import { UNIT_MOVE_TO } from "./actionTypes";

export const actionUnitMoveTo: Action<IState, Client> = (room, state, isServer, client, payload) => {
    try {

    } catch (err) {
        console.error('Error', UNIT_MOVE_TO, err)
    }
}