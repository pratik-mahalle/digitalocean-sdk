import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiUpdateKnowledgeBaseDataSourceOutput, ApiUpdateKnowledgeBaseDataSourceOutputUpdateData } from '../DigitaloceanTypes';
declare class ApiUpdateKnowledgeBaseDataSourceOutputEntity extends DigitaloceanEntityBase<ApiUpdateKnowledgeBaseDataSourceOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiUpdateKnowledgeBaseDataSourceOutputEntity): ApiUpdateKnowledgeBaseDataSourceOutputEntity;
    update(this: any, reqdata?: ApiUpdateKnowledgeBaseDataSourceOutputUpdateData, ctrl?: Control): Promise<ApiUpdateKnowledgeBaseDataSourceOutputEntity>;
}
export { ApiUpdateKnowledgeBaseDataSourceOutputEntity };
