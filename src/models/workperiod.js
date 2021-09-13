import { BaseEntity } from '.';


export const WorkPeriodStatus = {
    STARTED: 1,
    ENDED: 2,
    CANCELLED: 3
}
export class WorkPeriod extends BaseEntity {
    constructor() {
        super();
        this.date = new Date();
        this.startTime = new Date();
        this.endTime = new Date();
        this.transactions = [];
        this.status = WorkPeriodStatus.STARTED;
    }
}