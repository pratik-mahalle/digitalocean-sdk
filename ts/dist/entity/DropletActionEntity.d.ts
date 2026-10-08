import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { DropletAction, DropletActionLoadMatch, DropletActionListMatch, DropletActionCreateData } from '../DigitaloceanTypes';
declare class DropletActionEntity extends DigitaloceanEntityBase<DropletAction> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: DropletActionEntity): DropletActionEntity;
    load(this: any, reqmatch?: DropletActionLoadMatch, ctrl?: Control): Promise<DropletActionEntity>;
    list(this: any, reqmatch?: DropletActionListMatch, ctrl?: Control): Promise<DropletActionEntity[]>;
    create(this: any, reqdata?: DropletActionCreateData, ctrl?: Control): Promise<DropletActionEntity>;
}
export { DropletActionEntity };
