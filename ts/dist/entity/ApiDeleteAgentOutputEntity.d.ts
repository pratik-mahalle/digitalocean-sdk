import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiDeleteAgentOutput, ApiDeleteAgentOutputListMatch, ApiDeleteAgentOutputCreateData, ApiDeleteAgentOutputRemoveMatch } from '../DigitaloceanTypes';
declare class ApiDeleteAgentOutputEntity extends DigitaloceanEntityBase<ApiDeleteAgentOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiDeleteAgentOutputEntity): ApiDeleteAgentOutputEntity;
    list(this: any, reqmatch?: ApiDeleteAgentOutputListMatch, ctrl?: Control): Promise<ApiDeleteAgentOutputEntity[]>;
    create(this: any, reqdata?: ApiDeleteAgentOutputCreateData, ctrl?: Control): Promise<ApiDeleteAgentOutputEntity>;
    remove(this: any, reqmatch?: ApiDeleteAgentOutputRemoveMatch, ctrl?: Control): Promise<ApiDeleteAgentOutputEntity>;
}
export { ApiDeleteAgentOutputEntity };
