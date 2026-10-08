import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { FunctionType, FunctionLoadMatch, FunctionListMatch, FunctionCreateData, FunctionUpdateData, FunctionRemoveMatch } from '../DigitaloceanTypes';
declare class FunctionEntity extends DigitaloceanEntityBase<FunctionType> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: FunctionEntity): FunctionEntity;
    load(this: any, reqmatch?: FunctionLoadMatch, ctrl?: Control): Promise<FunctionEntity>;
    list(this: any, reqmatch?: FunctionListMatch, ctrl?: Control): Promise<FunctionEntity[]>;
    create(this: any, reqdata?: FunctionCreateData, ctrl?: Control): Promise<FunctionEntity>;
    update(this: any, reqdata?: FunctionUpdateData, ctrl?: Control): Promise<FunctionEntity>;
    remove(this: any, reqmatch?: FunctionRemoveMatch, ctrl?: Control): Promise<FunctionEntity>;
}
export { FunctionEntity };
