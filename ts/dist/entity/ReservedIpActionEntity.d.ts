import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ReservedIpAction, ReservedIpActionLoadMatch, ReservedIpActionListMatch, ReservedIpActionCreateData } from '../DigitaloceanTypes';
declare class ReservedIpActionEntity extends DigitaloceanEntityBase<ReservedIpAction> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ReservedIpActionEntity): ReservedIpActionEntity;
    load(this: any, reqmatch?: ReservedIpActionLoadMatch, ctrl?: Control): Promise<ReservedIpActionEntity>;
    list(this: any, reqmatch?: ReservedIpActionListMatch, ctrl?: Control): Promise<ReservedIpActionEntity[]>;
    create(this: any, reqdata?: ReservedIpActionCreateData, ctrl?: Control): Promise<ReservedIpActionEntity>;
}
export { ReservedIpActionEntity };
