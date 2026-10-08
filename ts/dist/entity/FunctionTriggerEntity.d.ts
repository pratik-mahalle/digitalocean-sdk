import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { FunctionTrigger, FunctionTriggerLoadMatch, FunctionTriggerListMatch, FunctionTriggerCreateData, FunctionTriggerUpdateData, FunctionTriggerRemoveMatch } from '../DigitaloceanTypes';
declare class FunctionTriggerEntity extends DigitaloceanEntityBase<FunctionTrigger> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: FunctionTriggerEntity): FunctionTriggerEntity;
    load(this: any, reqmatch?: FunctionTriggerLoadMatch, ctrl?: Control): Promise<FunctionTriggerEntity>;
    list(this: any, reqmatch?: FunctionTriggerListMatch, ctrl?: Control): Promise<FunctionTriggerEntity[]>;
    create(this: any, reqdata?: FunctionTriggerCreateData, ctrl?: Control): Promise<FunctionTriggerEntity>;
    update(this: any, reqdata?: FunctionTriggerUpdateData, ctrl?: Control): Promise<FunctionTriggerEntity>;
    remove(this: any, reqmatch?: FunctionTriggerRemoveMatch, ctrl?: Control): Promise<FunctionTriggerEntity>;
}
export { FunctionTriggerEntity };
