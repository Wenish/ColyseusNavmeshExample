import { Action } from "../actions/index";
import { IState } from "../state";
import { Client } from "colyseus";
import { PLAYER_REMOVE } from "./actionTypes";
import { Player } from "../models/player";

export const actionPlayerRemove: Action<IState, Client> = (room, state, isServer, client, payload) => {
    try {
        if (!isServer) throw 'action can only be called from server'
        if (!client) throw 'no client was passed'

        const player: Player = state.statePlayers.players[client.sessionId]

        console.log(player)
        if (player?.idUnit) {
            state.stateUnits.removeUnit(player.idUnit)
        }

        state.statePlayers.removePlayer(client.sessionId)
    } catch (err) {
        console.error('Error', PLAYER_REMOVE, err)
    }
}