import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGetKnowledgeBaseOutput, ApiGetKnowledgeBaseOutputLoadMatch } from '../DigitaloceanTypes';
declare class ApiGetKnowledgeBaseOutputEntity extends DigitaloceanEntityBase<ApiGetKnowledgeBaseOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGetKnowledgeBaseOutputEntity): ApiGetKnowledgeBaseOutputEntity;
    load(this: any, reqmatch?: ApiGetKnowledgeBaseOutputLoadMatch, ctrl?: Control): Promise<ApiGetKnowledgeBaseOutputEntity>;
}
export { ApiGetKnowledgeBaseOutputEntity };
