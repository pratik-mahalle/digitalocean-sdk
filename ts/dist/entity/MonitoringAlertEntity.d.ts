import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { MonitoringAlert, MonitoringAlertLoadMatch, MonitoringAlertListMatch, MonitoringAlertCreateData, MonitoringAlertUpdateData, MonitoringAlertRemoveMatch } from '../DigitaloceanTypes';
declare class MonitoringAlertEntity extends DigitaloceanEntityBase<MonitoringAlert> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: MonitoringAlertEntity): MonitoringAlertEntity;
    load(this: any, reqmatch?: MonitoringAlertLoadMatch, ctrl?: Control): Promise<MonitoringAlertEntity>;
    list(this: any, reqmatch?: MonitoringAlertListMatch, ctrl?: Control): Promise<MonitoringAlertEntity[]>;
    create(this: any, reqdata?: MonitoringAlertCreateData, ctrl?: Control): Promise<MonitoringAlertEntity>;
    update(this: any, reqdata?: MonitoringAlertUpdateData, ctrl?: Control): Promise<MonitoringAlertEntity>;
    remove(this: any, reqmatch?: MonitoringAlertRemoveMatch, ctrl?: Control): Promise<MonitoringAlertEntity>;
}
export { MonitoringAlertEntity };
