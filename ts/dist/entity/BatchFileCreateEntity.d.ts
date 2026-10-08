import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { BatchFileCreate, BatchFileCreateCreateData } from '../DigitaloceanTypes';
declare class BatchFileCreateEntity extends DigitaloceanEntityBase<BatchFileCreate> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: BatchFileCreateEntity): BatchFileCreateEntity;
    create(this: any, reqdata?: BatchFileCreateCreateData, ctrl?: Control): Promise<BatchFileCreateEntity>;
}
export { BatchFileCreateEntity };
