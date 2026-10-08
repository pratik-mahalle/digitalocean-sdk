import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiModelRouterPreset, ApiModelRouterPresetListMatch } from '../DigitaloceanTypes';
declare class ApiModelRouterPresetEntity extends DigitaloceanEntityBase<ApiModelRouterPreset> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiModelRouterPresetEntity): ApiModelRouterPresetEntity;
    list(this: any, reqmatch?: ApiModelRouterPresetListMatch, ctrl?: Control): Promise<ApiModelRouterPresetEntity[]>;
}
export { ApiModelRouterPresetEntity };
