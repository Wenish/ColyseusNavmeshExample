import shortid from 'shortid';
import { Schema, type } from "@colyseus/schema";

export class Unit extends Schema {
    @type('string') public id: string;

    constructor (id?: string) {
        super();
        this.id = id || shortid.generate()
    }

    update(currentTime?: number) {
        /* update Unit stuff */
    }
}