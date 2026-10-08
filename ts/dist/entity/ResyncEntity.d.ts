import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Resync, ResyncCreateData } from '../DigitaloceanTypes';
declare class ResyncEntity extends DigitaloceanEntityBase<Resync> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ResyncEntity): ResyncEntity;
    create(this: any, reqdata?: ResyncCreateData, ctrl?: Control): Promise<ResyncEntity>;
}
export { ResyncEntity };
