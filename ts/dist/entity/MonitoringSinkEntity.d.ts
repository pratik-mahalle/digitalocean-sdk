import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { MonitoringSink, MonitoringSinkLoadMatch, MonitoringSinkListMatch, MonitoringSinkCreateData, MonitoringSinkRemoveMatch } from '../DigitaloceanTypes';
declare class MonitoringSinkEntity extends DigitaloceanEntityBase<MonitoringSink> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: MonitoringSinkEntity): MonitoringSinkEntity;
    load(this: any, reqmatch?: MonitoringSinkLoadMatch, ctrl?: Control): Promise<MonitoringSinkEntity>;
    list(this: any, reqmatch?: MonitoringSinkListMatch, ctrl?: Control): Promise<MonitoringSinkEntity[]>;
    create(this: any, reqdata?: MonitoringSinkCreateData, ctrl?: Control): Promise<MonitoringSinkEntity>;
    remove(this: any, reqmatch?: MonitoringSinkRemoveMatch, ctrl?: Control): Promise<MonitoringSinkEntity>;
}
export { MonitoringSinkEntity };
