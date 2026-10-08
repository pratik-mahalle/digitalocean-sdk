import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiUpdateCustomEvaluationMetricOutput, ApiUpdateCustomEvaluationMetricOutputCreateData, ApiUpdateCustomEvaluationMetricOutputUpdateData } from '../DigitaloceanTypes';
declare class ApiUpdateCustomEvaluationMetricOutputEntity extends DigitaloceanEntityBase<ApiUpdateCustomEvaluationMetricOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiUpdateCustomEvaluationMetricOutputEntity): ApiUpdateCustomEvaluationMetricOutputEntity;
    create(this: any, reqdata?: ApiUpdateCustomEvaluationMetricOutputCreateData, ctrl?: Control): Promise<ApiUpdateCustomEvaluationMetricOutputEntity>;
    update(this: any, reqdata?: ApiUpdateCustomEvaluationMetricOutputUpdateData, ctrl?: Control): Promise<ApiUpdateCustomEvaluationMetricOutputEntity>;
}
export { ApiUpdateCustomEvaluationMetricOutputEntity };
