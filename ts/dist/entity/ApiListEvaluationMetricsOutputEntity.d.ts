import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiListEvaluationMetricsOutput, ApiListEvaluationMetricsOutputListMatch } from '../DigitaloceanTypes';
declare class ApiListEvaluationMetricsOutputEntity extends DigitaloceanEntityBase<ApiListEvaluationMetricsOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiListEvaluationMetricsOutputEntity): ApiListEvaluationMetricsOutputEntity;
    list(this: any, reqmatch?: ApiListEvaluationMetricsOutputListMatch, ctrl?: Control): Promise<ApiListEvaluationMetricsOutputEntity[]>;
}
export { ApiListEvaluationMetricsOutputEntity };
