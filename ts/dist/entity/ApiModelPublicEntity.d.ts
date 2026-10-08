import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiModelPublic, ApiModelPublicListMatch } from '../DigitaloceanTypes';
declare class ApiModelPublicEntity extends DigitaloceanEntityBase<ApiModelPublic> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiModelPublicEntity): ApiModelPublicEntity;
    list(this: any, reqmatch?: ApiModelPublicListMatch, ctrl?: Control): Promise<ApiModelPublicEntity[]>;
}
export { ApiModelPublicEntity };
