import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiDeleteCustomEvaluationMetricOutput, ApiDeleteCustomEvaluationMetricOutputRemoveMatch } from '../DigitaloceanTypes';
declare class ApiDeleteCustomEvaluationMetricOutputEntity extends DigitaloceanEntityBase<ApiDeleteCustomEvaluationMetricOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiDeleteCustomEvaluationMetricOutputEntity): ApiDeleteCustomEvaluationMetricOutputEntity;
    remove(this: any, reqmatch?: ApiDeleteCustomEvaluationMetricOutputRemoveMatch, ctrl?: Control): Promise<ApiDeleteCustomEvaluationMetricOutputEntity>;
}
export { ApiDeleteCustomEvaluationMetricOutputEntity };
