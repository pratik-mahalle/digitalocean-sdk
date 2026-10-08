import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiImportCustomModelOutputPublic, ApiImportCustomModelOutputPublicCreateData } from '../DigitaloceanTypes';
declare class ApiImportCustomModelOutputPublicEntity extends DigitaloceanEntityBase<ApiImportCustomModelOutputPublic> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiImportCustomModelOutputPublicEntity): ApiImportCustomModelOutputPublicEntity;
    create(this: any, reqdata?: ApiImportCustomModelOutputPublicCreateData, ctrl?: Control): Promise<ApiImportCustomModelOutputPublicEntity>;
}
export { ApiImportCustomModelOutputPublicEntity };
