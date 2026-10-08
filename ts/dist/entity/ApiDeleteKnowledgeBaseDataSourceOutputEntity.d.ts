import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiDeleteKnowledgeBaseDataSourceOutput, ApiDeleteKnowledgeBaseDataSourceOutputRemoveMatch } from '../DigitaloceanTypes';
declare class ApiDeleteKnowledgeBaseDataSourceOutputEntity extends DigitaloceanEntityBase<ApiDeleteKnowledgeBaseDataSourceOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiDeleteKnowledgeBaseDataSourceOutputEntity): ApiDeleteKnowledgeBaseDataSourceOutputEntity;
    remove(this: any, reqmatch?: ApiDeleteKnowledgeBaseDataSourceOutputRemoveMatch, ctrl?: Control): Promise<ApiDeleteKnowledgeBaseDataSourceOutputEntity>;
}
export { ApiDeleteKnowledgeBaseDataSourceOutputEntity };
