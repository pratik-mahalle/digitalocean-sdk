import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Batch, BatchLoadMatch, BatchListMatch, BatchCreateData } from '../DigitaloceanTypes';
declare class BatchEntity extends DigitaloceanEntityBase<Batch> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: BatchEntity): BatchEntity;
    load(this: any, reqmatch?: BatchLoadMatch, ctrl?: Control): Promise<BatchEntity>;
    list(this: any, reqmatch?: BatchListMatch, ctrl?: Control): Promise<BatchEntity[]>;
    create(this: any, reqdata?: BatchCreateData, ctrl?: Control): Promise<BatchEntity>;
}
export { BatchEntity };
