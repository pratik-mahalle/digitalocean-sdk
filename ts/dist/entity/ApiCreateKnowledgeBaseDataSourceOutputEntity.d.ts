import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiCreateKnowledgeBaseDataSourceOutput, ApiCreateKnowledgeBaseDataSourceOutputCreateData } from '../DigitaloceanTypes';
declare class ApiCreateKnowledgeBaseDataSourceOutputEntity extends DigitaloceanEntityBase<ApiCreateKnowledgeBaseDataSourceOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiCreateKnowledgeBaseDataSourceOutputEntity): ApiCreateKnowledgeBaseDataSourceOutputEntity;
    create(this: any, reqdata?: ApiCreateKnowledgeBaseDataSourceOutputCreateData, ctrl?: Control): Promise<ApiCreateKnowledgeBaseDataSourceOutputEntity>;
}
export { ApiCreateKnowledgeBaseDataSourceOutputEntity };
