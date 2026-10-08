import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiAgentVersion, ApiAgentVersionListMatch } from '../DigitaloceanTypes';
declare class ApiAgentVersionEntity extends DigitaloceanEntityBase<ApiAgentVersion> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiAgentVersionEntity): ApiAgentVersionEntity;
    list(this: any, reqmatch?: ApiAgentVersionListMatch, ctrl?: Control): Promise<ApiAgentVersionEntity[]>;
}
export { ApiAgentVersionEntity };
