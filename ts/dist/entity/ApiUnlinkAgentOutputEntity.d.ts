import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiUnlinkAgentOutput, ApiUnlinkAgentOutputRemoveMatch } from '../DigitaloceanTypes';
declare class ApiUnlinkAgentOutputEntity extends DigitaloceanEntityBase<ApiUnlinkAgentOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiUnlinkAgentOutputEntity): ApiUnlinkAgentOutputEntity;
    remove(this: any, reqmatch?: ApiUnlinkAgentOutputRemoveMatch, ctrl?: Control): Promise<ApiUnlinkAgentOutputEntity>;
}
export { ApiUnlinkAgentOutputEntity };
