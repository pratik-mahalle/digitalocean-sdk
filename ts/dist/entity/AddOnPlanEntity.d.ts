import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { AddOnPlan, AddOnPlanUpdateData } from '../DigitaloceanTypes';
declare class AddOnPlanEntity extends DigitaloceanEntityBase<AddOnPlan> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: AddOnPlanEntity): AddOnPlanEntity;
    update(this: any, reqdata?: AddOnPlanUpdateData, ctrl?: Control): Promise<AddOnPlanEntity>;
}
export { AddOnPlanEntity };
