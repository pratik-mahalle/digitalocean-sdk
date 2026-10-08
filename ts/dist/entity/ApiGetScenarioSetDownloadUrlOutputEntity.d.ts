import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGetScenarioSetDownloadUrlOutput, ApiGetScenarioSetDownloadUrlOutputLoadMatch } from '../DigitaloceanTypes';
declare class ApiGetScenarioSetDownloadUrlOutputEntity extends DigitaloceanEntityBase<ApiGetScenarioSetDownloadUrlOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGetScenarioSetDownloadUrlOutputEntity): ApiGetScenarioSetDownloadUrlOutputEntity;
    load(this: any, reqmatch?: ApiGetScenarioSetDownloadUrlOutputLoadMatch, ctrl?: Control): Promise<ApiGetScenarioSetDownloadUrlOutputEntity>;
}
export { ApiGetScenarioSetDownloadUrlOutputEntity };
