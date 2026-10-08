import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiListModelEvaluationMetricsOutput, ApiListModelEvaluationMetricsOutputListMatch } from '../DigitaloceanTypes';
declare class ApiListModelEvaluationMetricsOutputEntity extends DigitaloceanEntityBase<ApiListModelEvaluationMetricsOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiListModelEvaluationMetricsOutputEntity): ApiListModelEvaluationMetricsOutputEntity;
    list(this: any, reqmatch?: ApiListModelEvaluationMetricsOutputListMatch, ctrl?: Control): Promise<ApiListModelEvaluationMetricsOutputEntity[]>;
}
export { ApiListModelEvaluationMetricsOutputEntity };
