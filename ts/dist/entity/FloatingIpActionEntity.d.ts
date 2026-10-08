import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { FloatingIpAction, FloatingIpActionLoadMatch, FloatingIpActionListMatch, FloatingIpActionCreateData } from '../DigitaloceanTypes';
declare class FloatingIpActionEntity extends DigitaloceanEntityBase<FloatingIpAction> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: FloatingIpActionEntity): FloatingIpActionEntity;
    load(this: any, reqmatch?: FloatingIpActionLoadMatch, ctrl?: Control): Promise<FloatingIpActionEntity>;
    list(this: any, reqmatch?: FloatingIpActionListMatch, ctrl?: Control): Promise<FloatingIpActionEntity[]>;
    create(this: any, reqdata?: FloatingIpActionCreateData, ctrl?: Control): Promise<FloatingIpActionEntity>;
}
export { FloatingIpActionEntity };
