import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { MonitoringSinkDestination, MonitoringSinkDestinationLoadMatch, MonitoringSinkDestinationListMatch, MonitoringSinkDestinationCreateData, MonitoringSinkDestinationUpdateData, MonitoringSinkDestinationRemoveMatch } from '../DigitaloceanTypes';
declare class MonitoringSinkDestinationEntity extends DigitaloceanEntityBase<MonitoringSinkDestination> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: MonitoringSinkDestinationEntity): MonitoringSinkDestinationEntity;
    load(this: any, reqmatch?: MonitoringSinkDestinationLoadMatch, ctrl?: Control): Promise<MonitoringSinkDestinationEntity>;
    list(this: any, reqmatch?: MonitoringSinkDestinationListMatch, ctrl?: Control): Promise<MonitoringSinkDestinationEntity[]>;
    create(this: any, reqdata?: MonitoringSinkDestinationCreateData, ctrl?: Control): Promise<MonitoringSinkDestinationEntity>;
    update(this: any, reqdata?: MonitoringSinkDestinationUpdateData, ctrl?: Control): Promise<MonitoringSinkDestinationEntity>;
    remove(this: any, reqmatch?: MonitoringSinkDestinationRemoveMatch, ctrl?: Control): Promise<MonitoringSinkDestinationEntity>;
}
export { MonitoringSinkDestinationEntity };
