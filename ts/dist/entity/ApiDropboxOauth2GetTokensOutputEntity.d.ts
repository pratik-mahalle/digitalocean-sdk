import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiDropboxOauth2GetTokensOutput, ApiDropboxOauth2GetTokensOutputCreateData } from '../DigitaloceanTypes';
declare class ApiDropboxOauth2GetTokensOutputEntity extends DigitaloceanEntityBase<ApiDropboxOauth2GetTokensOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiDropboxOauth2GetTokensOutputEntity): ApiDropboxOauth2GetTokensOutputEntity;
    create(this: any, reqdata?: ApiDropboxOauth2GetTokensOutputCreateData, ctrl?: Control): Promise<ApiDropboxOauth2GetTokensOutputEntity>;
}
export { ApiDropboxOauth2GetTokensOutputEntity };
