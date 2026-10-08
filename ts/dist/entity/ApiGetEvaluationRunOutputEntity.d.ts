import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGetEvaluationRunOutput, ApiGetEvaluationRunOutputLoadMatch, ApiGetEvaluationRunOutputCreateData } from '../DigitaloceanTypes';
declare class ApiGetEvaluationRunOutputEntity extends DigitaloceanEntityBase<ApiGetEvaluationRunOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGetEvaluationRunOutputEntity): ApiGetEvaluationRunOutputEntity;
    load(this: any, reqmatch?: ApiGetEvaluationRunOutputLoadMatch, ctrl?: Control): Promise<ApiGetEvaluationRunOutputEntity>;
    create(this: any, reqdata?: ApiGetEvaluationRunOutputCreateData, ctrl?: Control): Promise<ApiGetEvaluationRunOutputEntity>;
}
export { ApiGetEvaluationRunOutputEntity };
