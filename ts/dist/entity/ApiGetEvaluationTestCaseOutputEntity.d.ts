import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGetEvaluationTestCaseOutput, ApiGetEvaluationTestCaseOutputLoadMatch, ApiGetEvaluationTestCaseOutputListMatch, ApiGetEvaluationTestCaseOutputCreateData } from '../DigitaloceanTypes';
declare class ApiGetEvaluationTestCaseOutputEntity extends DigitaloceanEntityBase<ApiGetEvaluationTestCaseOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGetEvaluationTestCaseOutputEntity): ApiGetEvaluationTestCaseOutputEntity;
    load(this: any, reqmatch?: ApiGetEvaluationTestCaseOutputLoadMatch, ctrl?: Control): Promise<ApiGetEvaluationTestCaseOutputEntity>;
    list(this: any, reqmatch?: ApiGetEvaluationTestCaseOutputListMatch, ctrl?: Control): Promise<ApiGetEvaluationTestCaseOutputEntity[]>;
    create(this: any, reqdata?: ApiGetEvaluationTestCaseOutputCreateData, ctrl?: Control): Promise<ApiGetEvaluationTestCaseOutputEntity>;
}
export { ApiGetEvaluationTestCaseOutputEntity };
