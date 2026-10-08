import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiGetKnowledgeBaseIndexingJobOutput, ApiGetKnowledgeBaseIndexingJobOutputLoadMatch, ApiGetKnowledgeBaseIndexingJobOutputListMatch, ApiGetKnowledgeBaseIndexingJobOutputCreateData, ApiGetKnowledgeBaseIndexingJobOutputUpdateData } from '../DigitaloceanTypes';
declare class ApiGetKnowledgeBaseIndexingJobOutputEntity extends DigitaloceanEntityBase<ApiGetKnowledgeBaseIndexingJobOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiGetKnowledgeBaseIndexingJobOutputEntity): ApiGetKnowledgeBaseIndexingJobOutputEntity;
    load(this: any, reqmatch?: ApiGetKnowledgeBaseIndexingJobOutputLoadMatch, ctrl?: Control): Promise<ApiGetKnowledgeBaseIndexingJobOutputEntity>;
    list(this: any, reqmatch?: ApiGetKnowledgeBaseIndexingJobOutputListMatch, ctrl?: Control): Promise<ApiGetKnowledgeBaseIndexingJobOutputEntity[]>;
    create(this: any, reqdata?: ApiGetKnowledgeBaseIndexingJobOutputCreateData, ctrl?: Control): Promise<ApiGetKnowledgeBaseIndexingJobOutputEntity>;
    update(this: any, reqdata?: ApiGetKnowledgeBaseIndexingJobOutputUpdateData, ctrl?: Control): Promise<ApiGetKnowledgeBaseIndexingJobOutputEntity>;
}
export { ApiGetKnowledgeBaseIndexingJobOutputEntity };
