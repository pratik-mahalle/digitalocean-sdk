import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { PartnerNetworkConnect, PartnerNetworkConnectLoadMatch, PartnerNetworkConnectListMatch, PartnerNetworkConnectCreateData, PartnerNetworkConnectUpdateData, PartnerNetworkConnectRemoveMatch } from '../DigitaloceanTypes';
declare class PartnerNetworkConnectEntity extends DigitaloceanEntityBase<PartnerNetworkConnect> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: PartnerNetworkConnectEntity): PartnerNetworkConnectEntity;
    load(this: any, reqmatch?: PartnerNetworkConnectLoadMatch, ctrl?: Control): Promise<PartnerNetworkConnectEntity>;
    list(this: any, reqmatch?: PartnerNetworkConnectListMatch, ctrl?: Control): Promise<PartnerNetworkConnectEntity[]>;
    create(this: any, reqdata?: PartnerNetworkConnectCreateData, ctrl?: Control): Promise<PartnerNetworkConnectEntity>;
    update(this: any, reqdata?: PartnerNetworkConnectUpdateData, ctrl?: Control): Promise<PartnerNetworkConnectEntity>;
    remove(this: any, reqmatch?: PartnerNetworkConnectRemoveMatch, ctrl?: Control): Promise<PartnerNetworkConnectEntity>;
}
export { PartnerNetworkConnectEntity };
