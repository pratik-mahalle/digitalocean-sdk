import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Monitoring, MonitoringLoadMatch, MonitoringListMatch, MonitoringCreateData, MonitoringUpdateData, MonitoringRemoveMatch } from '../DigitaloceanTypes';
declare class MonitoringEntity extends DigitaloceanEntityBase<Monitoring> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: MonitoringEntity): MonitoringEntity;
    load(this: any, reqmatch?: MonitoringLoadMatch, ctrl?: Control): Promise<MonitoringEntity>;
    list(this: any, reqmatch?: MonitoringListMatch, ctrl?: Control): Promise<MonitoringEntity[]>;
    create(this: any, reqdata?: MonitoringCreateData, ctrl?: Control): Promise<MonitoringEntity>;
    update(this: any, reqdata?: MonitoringUpdateData, ctrl?: Control): Promise<MonitoringEntity>;
    remove(this: any, reqmatch?: MonitoringRemoveMatch, ctrl?: Control): Promise<MonitoringEntity>;
}
export { MonitoringEntity };
