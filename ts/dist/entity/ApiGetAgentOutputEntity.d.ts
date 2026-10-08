import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGetAgentOutput, ApiGetAgentOutputLoadMatch, ApiGetAgentOutputUpdateData } from '../DigitaloceanTypes';
declare class ApiGetAgentOutputEntity extends DigitaloceanEntityBase<ApiGetAgentOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGetAgentOutputEntity): ApiGetAgentOutputEntity;
    load(this: any, reqmatch?: ApiGetAgentOutputLoadMatch, ctrl?: Control): Promise<ApiGetAgentOutputEntity>;
    update(this: any, reqdata?: ApiGetAgentOutputUpdateData, ctrl?: Control): Promise<ApiGetAgentOutputEntity>;
}
export { ApiGetAgentOutputEntity };
