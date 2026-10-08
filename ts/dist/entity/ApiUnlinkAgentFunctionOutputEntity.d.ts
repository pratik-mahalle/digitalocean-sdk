import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiUnlinkAgentFunctionOutput, ApiUnlinkAgentFunctionOutputRemoveMatch } from '../DigitaloceanTypes';
declare class ApiUnlinkAgentFunctionOutputEntity extends DigitaloceanEntityBase<ApiUnlinkAgentFunctionOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiUnlinkAgentFunctionOutputEntity): ApiUnlinkAgentFunctionOutputEntity;
    remove(this: any, reqmatch?: ApiUnlinkAgentFunctionOutputRemoveMatch, ctrl?: Control): Promise<ApiUnlinkAgentFunctionOutputEntity>;
}
export { ApiUnlinkAgentFunctionOutputEntity };
