import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Systemone, SystemoneCreateData } from '../DigitaloceanTypes';
declare class SystemoneEntity extends DigitaloceanEntityBase<Systemone> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: SystemoneEntity): SystemoneEntity;
    create(this: any, reqdata?: SystemoneCreateData, ctrl?: Control): Promise<SystemoneEntity>;
}
export { SystemoneEntity };
