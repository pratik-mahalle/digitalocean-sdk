import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiDeleteEvaluationDatasetOutput, ApiDeleteEvaluationDatasetOutputListMatch, ApiDeleteEvaluationDatasetOutputCreateData, ApiDeleteEvaluationDatasetOutputRemoveMatch } from '../DigitaloceanTypes';
declare class ApiDeleteEvaluationDatasetOutputEntity extends DigitaloceanEntityBase<ApiDeleteEvaluationDatasetOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiDeleteEvaluationDatasetOutputEntity): ApiDeleteEvaluationDatasetOutputEntity;
    list(this: any, reqmatch?: ApiDeleteEvaluationDatasetOutputListMatch, ctrl?: Control): Promise<ApiDeleteEvaluationDatasetOutputEntity[]>;
    create(this: any, reqdata?: ApiDeleteEvaluationDatasetOutputCreateData, ctrl?: Control): Promise<ApiDeleteEvaluationDatasetOutputEntity>;
    remove(this: any, reqmatch?: ApiDeleteEvaluationDatasetOutputRemoveMatch, ctrl?: Control): Promise<ApiDeleteEvaluationDatasetOutputEntity>;
}
export { ApiDeleteEvaluationDatasetOutputEntity };
