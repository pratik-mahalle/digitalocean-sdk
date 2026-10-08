import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { AppAlert, AppAlertListMatch, AppAlertCreateData } from '../DigitaloceanTypes';
declare class AppAlertEntity extends DigitaloceanEntityBase<AppAlert> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: AppAlertEntity): AppAlertEntity;
    list(this: any, reqmatch?: AppAlertListMatch, ctrl?: Control): Promise<AppAlertEntity[]>;
    create(this: any, reqdata?: AppAlertCreateData, ctrl?: Control): Promise<AppAlertEntity>;
}
export { AppAlertEntity };
