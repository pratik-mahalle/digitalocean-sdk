import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiModelEvaluationPreset, ApiModelEvaluationPresetLoadMatch, ApiModelEvaluationPresetListMatch } from '../DigitaloceanTypes';
declare class ApiModelEvaluationPresetEntity extends DigitaloceanEntityBase<ApiModelEvaluationPreset> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiModelEvaluationPresetEntity): ApiModelEvaluationPresetEntity;
    load(this: any, reqmatch?: ApiModelEvaluationPresetLoadMatch, ctrl?: Control): Promise<ApiModelEvaluationPresetEntity>;
    list(this: any, reqmatch?: ApiModelEvaluationPresetListMatch, ctrl?: Control): Promise<ApiModelEvaluationPresetEntity[]>;
}
export { ApiModelEvaluationPresetEntity };
