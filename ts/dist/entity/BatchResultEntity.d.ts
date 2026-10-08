import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { BatchResult, BatchResultLoadMatch } from '../DigitaloceanTypes';
declare class BatchResultEntity extends DigitaloceanEntityBase<BatchResult> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: BatchResultEntity): BatchResultEntity;
    load(this: any, reqmatch?: BatchResultLoadMatch, ctrl?: Control): Promise<BatchResultEntity>;
}
export { BatchResultEntity };
