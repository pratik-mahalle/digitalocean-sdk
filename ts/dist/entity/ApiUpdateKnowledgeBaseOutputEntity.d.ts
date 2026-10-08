import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiUpdateKnowledgeBaseOutput, ApiUpdateKnowledgeBaseOutputListMatch, ApiUpdateKnowledgeBaseOutputCreateData, ApiUpdateKnowledgeBaseOutputUpdateData } from '../DigitaloceanTypes';
declare class ApiUpdateKnowledgeBaseOutputEntity extends DigitaloceanEntityBase<ApiUpdateKnowledgeBaseOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiUpdateKnowledgeBaseOutputEntity): ApiUpdateKnowledgeBaseOutputEntity;
    list(this: any, reqmatch?: ApiUpdateKnowledgeBaseOutputListMatch, ctrl?: Control): Promise<ApiUpdateKnowledgeBaseOutputEntity[]>;
    create(this: any, reqdata?: ApiUpdateKnowledgeBaseOutputCreateData, ctrl?: Control): Promise<ApiUpdateKnowledgeBaseOutputEntity>;
    update(this: any, reqdata?: ApiUpdateKnowledgeBaseOutputUpdateData, ctrl?: Control): Promise<ApiUpdateKnowledgeBaseOutputEntity>;
}
export { ApiUpdateKnowledgeBaseOutputEntity };
