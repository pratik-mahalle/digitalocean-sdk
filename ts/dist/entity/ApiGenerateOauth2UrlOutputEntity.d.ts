import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGenerateOauth2UrlOutput, ApiGenerateOauth2UrlOutputLoadMatch } from '../DigitaloceanTypes';
declare class ApiGenerateOauth2UrlOutputEntity extends DigitaloceanEntityBase<ApiGenerateOauth2UrlOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGenerateOauth2UrlOutputEntity): ApiGenerateOauth2UrlOutputEntity;
    load(this: any, reqmatch?: ApiGenerateOauth2UrlOutputLoadMatch, ctrl?: Control): Promise<ApiGenerateOauth2UrlOutputEntity>;
}
export { ApiGenerateOauth2UrlOutputEntity };
