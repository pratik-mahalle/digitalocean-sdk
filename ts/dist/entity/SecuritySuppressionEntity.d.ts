import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { SecuritySuppression, SecuritySuppressionCreateData, SecuritySuppressionRemoveMatch } from '../DigitaloceanTypes';
declare class SecuritySuppressionEntity extends DigitaloceanEntityBase<SecuritySuppression> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: SecuritySuppressionEntity): SecuritySuppressionEntity;
    create(this: any, reqdata?: SecuritySuppressionCreateData, ctrl?: Control): Promise<SecuritySuppressionEntity>;
    remove(this: any, reqmatch?: SecuritySuppressionRemoveMatch, ctrl?: Control): Promise<SecuritySuppressionEntity>;
}
export { SecuritySuppressionEntity };
