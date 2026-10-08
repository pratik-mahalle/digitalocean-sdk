import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { BatchInference, BatchInferenceUpdateData } from '../DigitaloceanTypes';
declare class BatchInferenceEntity extends DigitaloceanEntityBase<BatchInference> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: BatchInferenceEntity): BatchInferenceEntity;
    update(this: any, reqdata?: BatchInferenceUpdateData, ctrl?: Control): Promise<BatchInferenceEntity>;
}
export { BatchInferenceEntity };
