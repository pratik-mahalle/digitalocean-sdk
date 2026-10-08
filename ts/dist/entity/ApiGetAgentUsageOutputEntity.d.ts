import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGetAgentUsageOutput, ApiGetAgentUsageOutputLoadMatch } from '../DigitaloceanTypes';
declare class ApiGetAgentUsageOutputEntity extends DigitaloceanEntityBase<ApiGetAgentUsageOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGetAgentUsageOutputEntity): ApiGetAgentUsageOutputEntity;
    load(this: any, reqmatch?: ApiGetAgentUsageOutputLoadMatch, ctrl?: Control): Promise<ApiGetAgentUsageOutputEntity>;
}
export { ApiGetAgentUsageOutputEntity };
