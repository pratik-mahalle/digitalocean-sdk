import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGetModelEvaluationRunOutput, ApiGetModelEvaluationRunOutputLoadMatch, ApiGetModelEvaluationRunOutputUpdateData } from '../DigitaloceanTypes';
declare class ApiGetModelEvaluationRunOutputEntity extends DigitaloceanEntityBase<ApiGetModelEvaluationRunOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGetModelEvaluationRunOutputEntity): ApiGetModelEvaluationRunOutputEntity;
    load(this: any, reqmatch?: ApiGetModelEvaluationRunOutputLoadMatch, ctrl?: Control): Promise<ApiGetModelEvaluationRunOutputEntity>;
    update(this: any, reqdata?: ApiGetModelEvaluationRunOutputUpdateData, ctrl?: Control): Promise<ApiGetModelEvaluationRunOutputEntity>;
}
export { ApiGetModelEvaluationRunOutputEntity };
