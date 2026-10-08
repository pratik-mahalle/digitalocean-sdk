import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Vpc, VpcLoadMatch, VpcListMatch, VpcCreateData, VpcUpdateData, VpcPatchData, VpcRemoveMatch } from '../DigitaloceanTypes';
declare class VpcEntity extends DigitaloceanEntityBase<Vpc> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: VpcEntity): VpcEntity;
    load(this: any, reqmatch?: VpcLoadMatch, ctrl?: Control): Promise<VpcEntity>;
    list(this: any, reqmatch?: VpcListMatch, ctrl?: Control): Promise<VpcEntity[]>;
    create(this: any, reqdata?: VpcCreateData, ctrl?: Control): Promise<VpcEntity>;
    update(this: any, reqdata?: VpcUpdateData, ctrl?: Control): Promise<VpcEntity>;
    patch(this: any, reqdata?: VpcPatchData, ctrl?: Control): Promise<VpcEntity>;
    remove(this: any, reqmatch?: VpcRemoveMatch, ctrl?: Control): Promise<VpcEntity>;
}
export { VpcEntity };
