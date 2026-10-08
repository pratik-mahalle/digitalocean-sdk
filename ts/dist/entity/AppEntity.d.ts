import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { App, AppLoadMatch, AppListMatch, AppCreateData, AppUpdateData, AppRemoveMatch } from '../DigitaloceanTypes';
declare class AppEntity extends DigitaloceanEntityBase<App> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: AppEntity): AppEntity;
    load(this: any, reqmatch?: AppLoadMatch, ctrl?: Control): Promise<AppEntity>;
    list(this: any, reqmatch?: AppListMatch, ctrl?: Control): Promise<AppEntity[]>;
    create(this: any, reqdata?: AppCreateData, ctrl?: Control): Promise<AppEntity>;
    update(this: any, reqdata?: AppUpdateData, ctrl?: Control): Promise<AppEntity>;
    remove(this: any, reqmatch?: AppRemoveMatch, ctrl?: Control): Promise<AppEntity>;
}
export { AppEntity };
