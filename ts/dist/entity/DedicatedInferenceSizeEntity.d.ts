import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { DedicatedInferenceSize, DedicatedInferenceSizeListMatch } from '../DigitaloceanTypes';
declare class DedicatedInferenceSizeEntity extends DigitaloceanEntityBase<DedicatedInferenceSize> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: DedicatedInferenceSizeEntity): DedicatedInferenceSizeEntity;
    list(this: any, reqmatch?: DedicatedInferenceSizeListMatch, ctrl?: Control): Promise<DedicatedInferenceSizeEntity[]>;
}
export { DedicatedInferenceSizeEntity };
