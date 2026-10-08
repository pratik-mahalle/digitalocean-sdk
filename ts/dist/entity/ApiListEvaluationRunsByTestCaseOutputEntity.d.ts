import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiListEvaluationRunsByTestCaseOutput, ApiListEvaluationRunsByTestCaseOutputListMatch } from '../DigitaloceanTypes';
declare class ApiListEvaluationRunsByTestCaseOutputEntity extends DigitaloceanEntityBase<ApiListEvaluationRunsByTestCaseOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiListEvaluationRunsByTestCaseOutputEntity): ApiListEvaluationRunsByTestCaseOutputEntity;
    list(this: any, reqmatch?: ApiListEvaluationRunsByTestCaseOutputListMatch, ctrl?: Control): Promise<ApiListEvaluationRunsByTestCaseOutputEntity[]>;
}
export { ApiListEvaluationRunsByTestCaseOutputEntity };
