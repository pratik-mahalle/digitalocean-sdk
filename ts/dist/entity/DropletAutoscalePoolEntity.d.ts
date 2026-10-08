import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { DropletAutoscalePool, DropletAutoscalePoolLoadMatch, DropletAutoscalePoolListMatch, DropletAutoscalePoolCreateData, DropletAutoscalePoolUpdateData, DropletAutoscalePoolRemoveMatch } from '../DigitaloceanTypes';
declare class DropletAutoscalePoolEntity extends DigitaloceanEntityBase<DropletAutoscalePool> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: DropletAutoscalePoolEntity): DropletAutoscalePoolEntity;
    load(this: any, reqmatch?: DropletAutoscalePoolLoadMatch, ctrl?: Control): Promise<DropletAutoscalePoolEntity>;
    list(this: any, reqmatch?: DropletAutoscalePoolListMatch, ctrl?: Control): Promise<DropletAutoscalePoolEntity[]>;
    create(this: any, reqdata?: DropletAutoscalePoolCreateData, ctrl?: Control): Promise<DropletAutoscalePoolEntity>;
    update(this: any, reqdata?: DropletAutoscalePoolUpdateData, ctrl?: Control): Promise<DropletAutoscalePoolEntity>;
    remove(this: any, reqmatch?: DropletAutoscalePoolRemoveMatch, ctrl?: Control): Promise<DropletAutoscalePoolEntity>;
}
export { DropletAutoscalePoolEntity };
