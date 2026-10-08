import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { DedicatedInferenceGpuModelConfig, DedicatedInferenceGpuModelConfigListMatch } from '../DigitaloceanTypes';
declare class DedicatedInferenceGpuModelConfigEntity extends DigitaloceanEntityBase<DedicatedInferenceGpuModelConfig> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: DedicatedInferenceGpuModelConfigEntity): DedicatedInferenceGpuModelConfigEntity;
    list(this: any, reqmatch?: DedicatedInferenceGpuModelConfigListMatch, ctrl?: Control): Promise<DedicatedInferenceGpuModelConfigEntity[]>;
}
export { DedicatedInferenceGpuModelConfigEntity };
