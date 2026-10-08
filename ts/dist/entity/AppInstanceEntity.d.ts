import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { AppInstance, AppInstanceListMatch } from '../DigitaloceanTypes';
declare class AppInstanceEntity extends DigitaloceanEntityBase<AppInstance> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: AppInstanceEntity): AppInstanceEntity;
    list(this: any, reqmatch?: AppInstanceListMatch, ctrl?: Control): Promise<AppInstanceEntity[]>;
}
export { AppInstanceEntity };
