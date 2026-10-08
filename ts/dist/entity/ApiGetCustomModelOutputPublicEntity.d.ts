import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGetCustomModelOutputPublic, ApiGetCustomModelOutputPublicLoadMatch, ApiGetCustomModelOutputPublicListMatch, ApiGetCustomModelOutputPublicUpdateData } from '../DigitaloceanTypes';
declare class ApiGetCustomModelOutputPublicEntity extends DigitaloceanEntityBase<ApiGetCustomModelOutputPublic> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGetCustomModelOutputPublicEntity): ApiGetCustomModelOutputPublicEntity;
    load(this: any, reqmatch?: ApiGetCustomModelOutputPublicLoadMatch, ctrl?: Control): Promise<ApiGetCustomModelOutputPublicEntity>;
    list(this: any, reqmatch?: ApiGetCustomModelOutputPublicListMatch, ctrl?: Control): Promise<ApiGetCustomModelOutputPublicEntity[]>;
    update(this: any, reqdata?: ApiGetCustomModelOutputPublicUpdateData, ctrl?: Control): Promise<ApiGetCustomModelOutputPublicEntity>;
}
export { ApiGetCustomModelOutputPublicEntity };
