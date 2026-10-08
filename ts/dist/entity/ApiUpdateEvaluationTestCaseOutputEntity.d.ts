import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiUpdateEvaluationTestCaseOutput, ApiUpdateEvaluationTestCaseOutputUpdateData } from '../DigitaloceanTypes';
declare class ApiUpdateEvaluationTestCaseOutputEntity extends DigitaloceanEntityBase<ApiUpdateEvaluationTestCaseOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiUpdateEvaluationTestCaseOutputEntity): ApiUpdateEvaluationTestCaseOutputEntity;
    update(this: any, reqdata?: ApiUpdateEvaluationTestCaseOutputUpdateData, ctrl?: Control): Promise<ApiUpdateEvaluationTestCaseOutputEntity>;
}
export { ApiUpdateEvaluationTestCaseOutputEntity };
