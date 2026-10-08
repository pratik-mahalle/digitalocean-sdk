import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { AppPropose, AppProposeCreateData } from '../DigitaloceanTypes';
declare class AppProposeEntity extends DigitaloceanEntityBase<AppPropose> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: AppProposeEntity): AppProposeEntity;
    create(this: any, reqdata?: AppProposeCreateData, ctrl?: Control): Promise<AppProposeEntity>;
}
export { AppProposeEntity };
