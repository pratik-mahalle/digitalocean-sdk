import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Setting, SettingLoadMatch } from '../DigitaloceanTypes';
declare class SettingEntity extends DigitaloceanEntityBase<Setting> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: SettingEntity): SettingEntity;
    load(this: any, reqmatch?: SettingLoadMatch, ctrl?: Control): Promise<SettingEntity>;
}
export { SettingEntity };
