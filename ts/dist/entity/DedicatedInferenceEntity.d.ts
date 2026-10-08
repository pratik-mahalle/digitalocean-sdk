import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { DedicatedInference, DedicatedInferenceLoadMatch, DedicatedInferenceListMatch, DedicatedInferenceCreateData, DedicatedInferenceUpdateData, DedicatedInferenceRemoveMatch } from '../DigitaloceanTypes';
declare class DedicatedInferenceEntity extends DigitaloceanEntityBase<DedicatedInference> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: DedicatedInferenceEntity): DedicatedInferenceEntity;
    load(this: any, reqmatch?: DedicatedInferenceLoadMatch, ctrl?: Control): Promise<DedicatedInferenceEntity>;
    list(this: any, reqmatch?: DedicatedInferenceListMatch, ctrl?: Control): Promise<DedicatedInferenceEntity[]>;
    create(this: any, reqdata?: DedicatedInferenceCreateData, ctrl?: Control): Promise<DedicatedInferenceEntity>;
    update(this: any, reqdata?: DedicatedInferenceUpdateData, ctrl?: Control): Promise<DedicatedInferenceEntity>;
    remove(this: any, reqmatch?: DedicatedInferenceRemoveMatch, ctrl?: Control): Promise<DedicatedInferenceEntity>;
}
export { DedicatedInferenceEntity };
