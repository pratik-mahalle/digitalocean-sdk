import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiLinkAgentOutput, ApiLinkAgentOutputCreateData } from '../DigitaloceanTypes';
declare class ApiLinkAgentOutputEntity extends DigitaloceanEntityBase<ApiLinkAgentOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiLinkAgentOutputEntity): ApiLinkAgentOutputEntity;
    create(this: any, reqdata?: ApiLinkAgentOutputCreateData, ctrl?: Control): Promise<ApiLinkAgentOutputEntity>;
}
export { ApiLinkAgentOutputEntity };
