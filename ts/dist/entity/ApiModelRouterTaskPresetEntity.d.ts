import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiModelRouterTaskPreset, ApiModelRouterTaskPresetListMatch } from '../DigitaloceanTypes';
declare class ApiModelRouterTaskPresetEntity extends DigitaloceanEntityBase<ApiModelRouterTaskPreset> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiModelRouterTaskPresetEntity): ApiModelRouterTaskPresetEntity;
    list(this: any, reqmatch?: ApiModelRouterTaskPresetListMatch, ctrl?: Control): Promise<ApiModelRouterTaskPresetEntity[]>;
}
export { ApiModelRouterTaskPresetEntity };
