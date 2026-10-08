import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { PromStringList, PromStringListListMatch, PromStringListCreateData } from '../DigitaloceanTypes';
declare class PromStringListEntity extends DigitaloceanEntityBase<PromStringList> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: PromStringListEntity): PromStringListEntity;
    list(this: any, reqmatch?: PromStringListListMatch, ctrl?: Control): Promise<PromStringListEntity[]>;
    create(this: any, reqdata?: PromStringListCreateData, ctrl?: Control): Promise<PromStringListEntity>;
}
export { PromStringListEntity };
