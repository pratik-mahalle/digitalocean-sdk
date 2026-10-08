import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiUpdateModelEvaluationRunOutput, ApiUpdateModelEvaluationRunOutputListMatch, ApiUpdateModelEvaluationRunOutputCreateData, ApiUpdateModelEvaluationRunOutputUpdateData } from '../DigitaloceanTypes';
declare class ApiUpdateModelEvaluationRunOutputEntity extends DigitaloceanEntityBase<ApiUpdateModelEvaluationRunOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiUpdateModelEvaluationRunOutputEntity): ApiUpdateModelEvaluationRunOutputEntity;
    list(this: any, reqmatch?: ApiUpdateModelEvaluationRunOutputListMatch, ctrl?: Control): Promise<ApiUpdateModelEvaluationRunOutputEntity[]>;
    create(this: any, reqdata?: ApiUpdateModelEvaluationRunOutputCreateData, ctrl?: Control): Promise<ApiUpdateModelEvaluationRunOutputEntity>;
    update(this: any, reqdata?: ApiUpdateModelEvaluationRunOutputUpdateData, ctrl?: Control): Promise<ApiUpdateModelEvaluationRunOutputEntity>;
}
export { ApiUpdateModelEvaluationRunOutputEntity };
