import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { FunctionKey, FunctionKeyListMatch, FunctionKeyCreateData, FunctionKeyUpdateData, FunctionKeyRemoveMatch } from '../DigitaloceanTypes';
declare class FunctionKeyEntity extends DigitaloceanEntityBase<FunctionKey> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: FunctionKeyEntity): FunctionKeyEntity;
    list(this: any, reqmatch?: FunctionKeyListMatch, ctrl?: Control): Promise<FunctionKeyEntity[]>;
    create(this: any, reqdata?: FunctionKeyCreateData, ctrl?: Control): Promise<FunctionKeyEntity>;
    update(this: any, reqdata?: FunctionKeyUpdateData, ctrl?: Control): Promise<FunctionKeyEntity>;
    remove(this: any, reqmatch?: FunctionKeyRemoveMatch, ctrl?: Control): Promise<FunctionKeyEntity>;
}
export { FunctionKeyEntity };
