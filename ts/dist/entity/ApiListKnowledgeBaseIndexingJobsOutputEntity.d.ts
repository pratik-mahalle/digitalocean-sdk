import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiListKnowledgeBaseIndexingJobsOutput, ApiListKnowledgeBaseIndexingJobsOutputListMatch } from '../DigitaloceanTypes';
declare class ApiListKnowledgeBaseIndexingJobsOutputEntity extends DigitaloceanEntityBase<ApiListKnowledgeBaseIndexingJobsOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiListKnowledgeBaseIndexingJobsOutputEntity): ApiListKnowledgeBaseIndexingJobsOutputEntity;
    list(this: any, reqmatch?: ApiListKnowledgeBaseIndexingJobsOutputListMatch, ctrl?: Control): Promise<ApiListKnowledgeBaseIndexingJobsOutputEntity[]>;
}
export { ApiListKnowledgeBaseIndexingJobsOutputEntity };
