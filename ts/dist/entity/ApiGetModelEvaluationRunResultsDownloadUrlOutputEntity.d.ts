import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGetModelEvaluationRunResultsDownloadUrlOutput, ApiGetModelEvaluationRunResultsDownloadUrlOutputLoadMatch } from '../DigitaloceanTypes';
declare class ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity extends DigitaloceanEntityBase<ApiGetModelEvaluationRunResultsDownloadUrlOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity): ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity;
    load(this: any, reqmatch?: ApiGetModelEvaluationRunResultsDownloadUrlOutputLoadMatch, ctrl?: Control): Promise<ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity>;
}
export { ApiGetModelEvaluationRunResultsDownloadUrlOutputEntity };
