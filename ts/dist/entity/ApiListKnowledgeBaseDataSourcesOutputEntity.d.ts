import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiListKnowledgeBaseDataSourcesOutput, ApiListKnowledgeBaseDataSourcesOutputListMatch } from '../DigitaloceanTypes';
declare class ApiListKnowledgeBaseDataSourcesOutputEntity extends DigitaloceanEntityBase<ApiListKnowledgeBaseDataSourcesOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiListKnowledgeBaseDataSourcesOutputEntity): ApiListKnowledgeBaseDataSourcesOutputEntity;
    list(this: any, reqmatch?: ApiListKnowledgeBaseDataSourcesOutputListMatch, ctrl?: Control): Promise<ApiListKnowledgeBaseDataSourcesOutputEntity[]>;
}
export { ApiListKnowledgeBaseDataSourcesOutputEntity };
