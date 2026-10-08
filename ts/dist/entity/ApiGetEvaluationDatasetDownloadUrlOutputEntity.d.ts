import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGetEvaluationDatasetDownloadUrlOutput, ApiGetEvaluationDatasetDownloadUrlOutputLoadMatch } from '../DigitaloceanTypes';
declare class ApiGetEvaluationDatasetDownloadUrlOutputEntity extends DigitaloceanEntityBase<ApiGetEvaluationDatasetDownloadUrlOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGetEvaluationDatasetDownloadUrlOutputEntity): ApiGetEvaluationDatasetDownloadUrlOutputEntity;
    load(this: any, reqmatch?: ApiGetEvaluationDatasetDownloadUrlOutputLoadMatch, ctrl?: Control): Promise<ApiGetEvaluationDatasetDownloadUrlOutputEntity>;
}
export { ApiGetEvaluationDatasetDownloadUrlOutputEntity };
