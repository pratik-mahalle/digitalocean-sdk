import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiLinkAgentFunctionOutput, ApiLinkAgentFunctionOutputCreateData } from '../DigitaloceanTypes';
declare class ApiLinkAgentFunctionOutputEntity extends DigitaloceanEntityBase<ApiLinkAgentFunctionOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiLinkAgentFunctionOutputEntity): ApiLinkAgentFunctionOutputEntity;
    create(this: any, reqdata?: ApiLinkAgentFunctionOutputCreateData, ctrl?: Control): Promise<ApiLinkAgentFunctionOutputEntity>;
}
export { ApiLinkAgentFunctionOutputEntity };
