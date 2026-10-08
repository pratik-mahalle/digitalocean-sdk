import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGetEvaluationRunResultsOutput, ApiGetEvaluationRunResultsOutputListMatch } from '../DigitaloceanTypes';
declare class ApiGetEvaluationRunResultsOutputEntity extends DigitaloceanEntityBase<ApiGetEvaluationRunResultsOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGetEvaluationRunResultsOutputEntity): ApiGetEvaluationRunResultsOutputEntity;
    list(this: any, reqmatch?: ApiGetEvaluationRunResultsOutputListMatch, ctrl?: Control): Promise<ApiGetEvaluationRunResultsOutputEntity[]>;
}
export { ApiGetEvaluationRunResultsOutputEntity };
