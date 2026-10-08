import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiDeleteModelEvaluationPresetOutput, ApiDeleteModelEvaluationPresetOutputRemoveMatch } from '../DigitaloceanTypes';
declare class ApiDeleteModelEvaluationPresetOutputEntity extends DigitaloceanEntityBase<ApiDeleteModelEvaluationPresetOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiDeleteModelEvaluationPresetOutputEntity): ApiDeleteModelEvaluationPresetOutputEntity;
    remove(this: any, reqmatch?: ApiDeleteModelEvaluationPresetOutputRemoveMatch, ctrl?: Control): Promise<ApiDeleteModelEvaluationPresetOutputEntity>;
}
export { ApiDeleteModelEvaluationPresetOutputEntity };
