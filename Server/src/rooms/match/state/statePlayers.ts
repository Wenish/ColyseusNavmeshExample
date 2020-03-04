import { Schema, type, MapSchema } from "@colyseus/schema"
import { Player } from '../models/player'

export class StatePlayers extends Schema implements IStatePlayers {
    @type({ map: Player })
    public players: MapSchema<Player> = new MapSchema<Player>();
    
    public addPlayer (player: Player): void {
        this.players[player.id] = player
        console.log('added player')
    }

    public removePlayer (idPlayer: string): void {
        delete this.players[idPlayer]
        console.log('removed player')
    }
}

export interface IStatePlayers extends Schema {
    players: MapSchema<Player>

    addPlayer (player: Player): void
    removePlayer (idPlayer: string): void
}