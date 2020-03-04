import http from "http";
import { Room, Client } from "colyseus";

import { State, IState } from './state';

import actions, { Action } from './actions'
import * as actionTypes from './actions/actionTypes';
import utility from "../../utility";

export default class Match extends Room<IState> {
    constructor () {
        console.log('----- NEW MATCH ROOM -----')
        super();
        this.setState(new State());
    }

    // When room is initialized
    async onCreate (options: any) {
        const navMesh = await utility.loadNavMesh('SampleSceneNavMesh')
        this.state.navMesh = navMesh;
        console.log('navmesh loaded')
        this.setPatchRate(1000 / 30);
        this.setSimulationInterval(() => this.update()); 
    }

    // Authorize client based on provided options before WebSocket handshake is complete
    onAuth (client: Client, options: any, request: http.IncomingMessage) {
        return true;
    }

    // When client successfully join the room
    onJoin (client: Client, options: any, auth: any) {
        const actionPlayerAdd: Action<IState, Client> = actions[actionTypes.PLAYER_ADD]
        actionPlayerAdd(this, this.state, true, client, null)
    }

    // When a client sends a message
    onMessage (client: Client, message: any) {
        console.log(client.sessionId)
        console.log(message)
        if (actions[message?.ACTION_TYPE]) {
            const action = actions[message.ACTION_TYPE]
            action(this, this.state, false, client, message.payload)
        } else {
            console.log('There is no action with this action type:', message?.ACTION_TYPE)
        }
    }

    // When a client leaves the room
    onLeave (client: Client, consented: boolean) {
        const actionPlayerRemove: Action<IState, Client> = actions[actionTypes.PLAYER_REMOVE]
        actionPlayerRemove(this, this.state, true, client, null)
    }

    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose () { }

    update () {
        for (var id in this.state?.stateUnits?.units) {
            this.state?.stateUnits?.units[id]?.update(this.clock.deltaTime)
        }
    }
}