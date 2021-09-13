import { v4 as uuid } from 'uuid'
export class BaseEntity {
    constructor() {
        this.id = uuid();
    }
}