import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiLinkKnowledgeBaseOutput, ApiLinkKnowledgeBaseOutputCreateData } from '../DigitaloceanTypes';
declare class ApiLinkKnowledgeBaseOutputEntity extends DigitaloceanEntityBase<ApiLinkKnowledgeBaseOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiLinkKnowledgeBaseOutputEntity): ApiLinkKnowledgeBaseOutputEntity;
    create(this: any, reqdata?: ApiLinkKnowledgeBaseOutputCreateData, ctrl?: Control): Promise<ApiLinkKnowledgeBaseOutputEntity>;
}
export { ApiLinkKnowledgeBaseOutputEntity };
