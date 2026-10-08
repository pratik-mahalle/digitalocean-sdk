import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiModelCatalogCard, ApiModelCatalogCardLoadMatch, ApiModelCatalogCardListMatch } from '../DigitaloceanTypes';
declare class ApiModelCatalogCardEntity extends DigitaloceanEntityBase<ApiModelCatalogCard> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiModelCatalogCardEntity): ApiModelCatalogCardEntity;
    load(this: any, reqmatch?: ApiModelCatalogCardLoadMatch, ctrl?: Control): Promise<ApiModelCatalogCardEntity>;
    list(this: any, reqmatch?: ApiModelCatalogCardListMatch, ctrl?: Control): Promise<ApiModelCatalogCardEntity[]>;
}
export { ApiModelCatalogCardEntity };
