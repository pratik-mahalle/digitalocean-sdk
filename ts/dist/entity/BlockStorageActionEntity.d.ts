import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { BlockStorageAction, BlockStorageActionLoadMatch, BlockStorageActionListMatch, BlockStorageActionCreateData } from '../DigitaloceanTypes';
declare class BlockStorageActionEntity extends DigitaloceanEntityBase<BlockStorageAction> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: BlockStorageActionEntity): BlockStorageActionEntity;
    load(this: any, reqmatch?: BlockStorageActionLoadMatch, ctrl?: Control): Promise<BlockStorageActionEntity>;
    list(this: any, reqmatch?: BlockStorageActionListMatch, ctrl?: Control): Promise<BlockStorageActionEntity[]>;
    create(this: any, reqdata?: BlockStorageActionCreateData, ctrl?: Control): Promise<BlockStorageActionEntity>;
}
export { BlockStorageActionEntity };
