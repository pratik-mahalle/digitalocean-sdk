import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { BlockStorage, BlockStorageLoadMatch, BlockStorageListMatch, BlockStorageCreateData, BlockStorageRemoveMatch } from '../DigitaloceanTypes';
declare class BlockStorageEntity extends DigitaloceanEntityBase<BlockStorage> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: BlockStorageEntity): BlockStorageEntity;
    load(this: any, reqmatch?: BlockStorageLoadMatch, ctrl?: Control): Promise<BlockStorageEntity>;
    list(this: any, reqmatch?: BlockStorageListMatch, ctrl?: Control): Promise<BlockStorageEntity[]>;
    create(this: any, reqdata?: BlockStorageCreateData, ctrl?: Control): Promise<BlockStorageEntity>;
    remove(this: any, reqmatch?: BlockStorageRemoveMatch, ctrl?: Control): Promise<BlockStorageEntity>;
}
export { BlockStorageEntity };
