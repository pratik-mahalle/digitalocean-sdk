import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { SecurityRule, SecurityRuleCreateData } from '../DigitaloceanTypes';
declare class SecurityRuleEntity extends DigitaloceanEntityBase<SecurityRule> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: SecurityRuleEntity): SecurityRuleEntity;
    create(this: any, reqdata?: SecurityRuleCreateData, ctrl?: Control): Promise<SecurityRuleEntity>;
}
export { SecurityRuleEntity };
