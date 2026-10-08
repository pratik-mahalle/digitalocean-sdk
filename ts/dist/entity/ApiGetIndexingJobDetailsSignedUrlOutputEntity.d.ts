import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGetIndexingJobDetailsSignedUrlOutput, ApiGetIndexingJobDetailsSignedUrlOutputLoadMatch } from '../DigitaloceanTypes';
declare class ApiGetIndexingJobDetailsSignedUrlOutputEntity extends DigitaloceanEntityBase<ApiGetIndexingJobDetailsSignedUrlOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGetIndexingJobDetailsSignedUrlOutputEntity): ApiGetIndexingJobDetailsSignedUrlOutputEntity;
    load(this: any, reqmatch?: ApiGetIndexingJobDetailsSignedUrlOutputLoadMatch, ctrl?: Control): Promise<ApiGetIndexingJobDetailsSignedUrlOutputEntity>;
}
export { ApiGetIndexingJobDetailsSignedUrlOutputEntity };
