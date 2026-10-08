import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiDeleteKnowledgeBaseOutput, ApiDeleteKnowledgeBaseOutputRemoveMatch } from '../DigitaloceanTypes';
declare class ApiDeleteKnowledgeBaseOutputEntity extends DigitaloceanEntityBase<ApiDeleteKnowledgeBaseOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiDeleteKnowledgeBaseOutputEntity): ApiDeleteKnowledgeBaseOutputEntity;
    remove(this: any, reqmatch?: ApiDeleteKnowledgeBaseOutputRemoveMatch, ctrl?: Control): Promise<ApiDeleteKnowledgeBaseOutputEntity>;
}
export { ApiDeleteKnowledgeBaseOutputEntity };
