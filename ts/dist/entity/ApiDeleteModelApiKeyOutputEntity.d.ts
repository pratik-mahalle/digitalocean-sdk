import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiDeleteModelApiKeyOutput, ApiDeleteModelApiKeyOutputListMatch, ApiDeleteModelApiKeyOutputCreateData, ApiDeleteModelApiKeyOutputUpdateData, ApiDeleteModelApiKeyOutputRemoveMatch } from '../DigitaloceanTypes';
declare class ApiDeleteModelApiKeyOutputEntity extends DigitaloceanEntityBase<ApiDeleteModelApiKeyOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiDeleteModelApiKeyOutputEntity): ApiDeleteModelApiKeyOutputEntity;
    list(this: any, reqmatch?: ApiDeleteModelApiKeyOutputListMatch, ctrl?: Control): Promise<ApiDeleteModelApiKeyOutputEntity[]>;
    create(this: any, reqdata?: ApiDeleteModelApiKeyOutputCreateData, ctrl?: Control): Promise<ApiDeleteModelApiKeyOutputEntity>;
    update(this: any, reqdata?: ApiDeleteModelApiKeyOutputUpdateData, ctrl?: Control): Promise<ApiDeleteModelApiKeyOutputEntity>;
    remove(this: any, reqmatch?: ApiDeleteModelApiKeyOutputRemoveMatch, ctrl?: Control): Promise<ApiDeleteModelApiKeyOutputEntity>;
}
export { ApiDeleteModelApiKeyOutputEntity };
