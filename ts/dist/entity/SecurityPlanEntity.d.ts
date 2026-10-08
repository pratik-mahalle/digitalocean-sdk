import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { SecurityPlan, SecurityPlanUpdateData } from '../DigitaloceanTypes';
declare class SecurityPlanEntity extends DigitaloceanEntityBase<SecurityPlan> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: SecurityPlanEntity): SecurityPlanEntity;
    update(this: any, reqdata?: SecurityPlanUpdateData, ctrl?: Control): Promise<SecurityPlanEntity>;
}
export { SecurityPlanEntity };
