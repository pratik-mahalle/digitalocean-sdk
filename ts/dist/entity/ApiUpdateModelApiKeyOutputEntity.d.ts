import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiUpdateModelApiKeyOutput, ApiUpdateModelApiKeyOutputUpdateData } from '../DigitaloceanTypes';
declare class ApiUpdateModelApiKeyOutputEntity extends DigitaloceanEntityBase<ApiUpdateModelApiKeyOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiUpdateModelApiKeyOutputEntity): ApiUpdateModelApiKeyOutputEntity;
    update(this: any, reqdata?: ApiUpdateModelApiKeyOutputUpdateData, ctrl?: Control): Promise<ApiUpdateModelApiKeyOutputEntity>;
}
export { ApiUpdateModelApiKeyOutputEntity };
