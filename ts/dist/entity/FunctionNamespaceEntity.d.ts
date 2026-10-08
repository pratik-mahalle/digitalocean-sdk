import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { FunctionNamespace, FunctionNamespaceLoadMatch, FunctionNamespaceListMatch, FunctionNamespaceCreateData, FunctionNamespaceRemoveMatch } from '../DigitaloceanTypes';
declare class FunctionNamespaceEntity extends DigitaloceanEntityBase<FunctionNamespace> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: FunctionNamespaceEntity): FunctionNamespaceEntity;
    load(this: any, reqmatch?: FunctionNamespaceLoadMatch, ctrl?: Control): Promise<FunctionNamespaceEntity>;
    list(this: any, reqmatch?: FunctionNamespaceListMatch, ctrl?: Control): Promise<FunctionNamespaceEntity[]>;
    create(this: any, reqdata?: FunctionNamespaceCreateData, ctrl?: Control): Promise<FunctionNamespaceEntity>;
    remove(this: any, reqmatch?: FunctionNamespaceRemoveMatch, ctrl?: Control): Promise<FunctionNamespaceEntity>;
}
export { FunctionNamespaceEntity };
