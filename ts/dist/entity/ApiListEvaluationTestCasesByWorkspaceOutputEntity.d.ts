import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiListEvaluationTestCasesByWorkspaceOutput, ApiListEvaluationTestCasesByWorkspaceOutputListMatch } from '../DigitaloceanTypes';
declare class ApiListEvaluationTestCasesByWorkspaceOutputEntity extends DigitaloceanEntityBase<ApiListEvaluationTestCasesByWorkspaceOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiListEvaluationTestCasesByWorkspaceOutputEntity): ApiListEvaluationTestCasesByWorkspaceOutputEntity;
    list(this: any, reqmatch?: ApiListEvaluationTestCasesByWorkspaceOutputListMatch, ctrl?: Control): Promise<ApiListEvaluationTestCasesByWorkspaceOutputEntity[]>;
}
export { ApiListEvaluationTestCasesByWorkspaceOutputEntity };
