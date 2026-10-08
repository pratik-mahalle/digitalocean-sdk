import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ApiUnlinkKnowledgeBaseOutput, ApiUnlinkKnowledgeBaseOutputRemoveMatch } from '../DigitaloceanTypes';
declare class ApiUnlinkKnowledgeBaseOutputEntity extends DigitaloceanEntityBase<ApiUnlinkKnowledgeBaseOutput> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ApiUnlinkKnowledgeBaseOutputEntity): ApiUnlinkKnowledgeBaseOutputEntity;
    remove(this: any, reqmatch?: ApiUnlinkKnowledgeBaseOutputRemoveMatch, ctrl?: Control): Promise<ApiUnlinkKnowledgeBaseOutputEntity>;
}
export { ApiUnlinkKnowledgeBaseOutputEntity };
