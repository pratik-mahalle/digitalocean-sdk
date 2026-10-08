import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiDeleteCustomModelOutputPublic, ApiDeleteCustomModelOutputPublicRemoveMatch } from '../DigitaloceanTypes';
declare class ApiDeleteCustomModelOutputPublicEntity extends DigitaloceanEntityBase<ApiDeleteCustomModelOutputPublic> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiDeleteCustomModelOutputPublicEntity): ApiDeleteCustomModelOutputPublicEntity;
    remove(this: any, reqmatch?: ApiDeleteCustomModelOutputPublicRemoveMatch, ctrl?: Control): Promise<ApiDeleteCustomModelOutputPublicEntity>;
}
export { ApiDeleteCustomModelOutputPublicEntity };
