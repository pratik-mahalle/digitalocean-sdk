import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiDeleteModelEvaluationRunOutputPublic, ApiDeleteModelEvaluationRunOutputPublicRemoveMatch } from '../DigitaloceanTypes';
declare class ApiDeleteModelEvaluationRunOutputPublicEntity extends DigitaloceanEntityBase<ApiDeleteModelEvaluationRunOutputPublic> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiDeleteModelEvaluationRunOutputPublicEntity): ApiDeleteModelEvaluationRunOutputPublicEntity;
    remove(this: any, reqmatch?: ApiDeleteModelEvaluationRunOutputPublicRemoveMatch, ctrl?: Control): Promise<ApiDeleteModelEvaluationRunOutputPublicEntity>;
}
export { ApiDeleteModelEvaluationRunOutputPublicEntity };
