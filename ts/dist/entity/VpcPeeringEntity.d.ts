import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { VpcPeering, VpcPeeringLoadMatch, VpcPeeringListMatch, VpcPeeringCreateData, VpcPeeringUpdateData, VpcPeeringRemoveMatch } from '../DigitaloceanTypes';
declare class VpcPeeringEntity extends DigitaloceanEntityBase<VpcPeering> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: VpcPeeringEntity): VpcPeeringEntity;
    load(this: any, reqmatch?: VpcPeeringLoadMatch, ctrl?: Control): Promise<VpcPeeringEntity>;
    list(this: any, reqmatch?: VpcPeeringListMatch, ctrl?: Control): Promise<VpcPeeringEntity[]>;
    create(this: any, reqdata?: VpcPeeringCreateData, ctrl?: Control): Promise<VpcPeeringEntity>;
    update(this: any, reqdata?: VpcPeeringUpdateData, ctrl?: Control): Promise<VpcPeeringEntity>;
    remove(this: any, reqmatch?: VpcPeeringRemoveMatch, ctrl?: Control): Promise<VpcPeeringEntity>;
}
export { VpcPeeringEntity };
