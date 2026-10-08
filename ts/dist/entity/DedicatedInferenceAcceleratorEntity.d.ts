import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { DedicatedInferenceAccelerator, DedicatedInferenceAcceleratorLoadMatch } from '../DigitaloceanTypes';
declare class DedicatedInferenceAcceleratorEntity extends DigitaloceanEntityBase<DedicatedInferenceAccelerator> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: DedicatedInferenceAcceleratorEntity): DedicatedInferenceAcceleratorEntity;
    load(this: any, reqmatch?: DedicatedInferenceAcceleratorLoadMatch, ctrl?: Control): Promise<DedicatedInferenceAcceleratorEntity>;
}
export { DedicatedInferenceAcceleratorEntity };
