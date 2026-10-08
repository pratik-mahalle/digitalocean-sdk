import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { VpcNatGateway, VpcNatGatewayLoadMatch, VpcNatGatewayListMatch, VpcNatGatewayCreateData, VpcNatGatewayUpdateData, VpcNatGatewayRemoveMatch } from '../DigitaloceanTypes';
declare class VpcNatGatewayEntity extends DigitaloceanEntityBase<VpcNatGateway> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: VpcNatGatewayEntity): VpcNatGatewayEntity;
    load(this: any, reqmatch?: VpcNatGatewayLoadMatch, ctrl?: Control): Promise<VpcNatGatewayEntity>;
    list(this: any, reqmatch?: VpcNatGatewayListMatch, ctrl?: Control): Promise<VpcNatGatewayEntity[]>;
    create(this: any, reqdata?: VpcNatGatewayCreateData, ctrl?: Control): Promise<VpcNatGatewayEntity>;
    update(this: any, reqdata?: VpcNatGatewayUpdateData, ctrl?: Control): Promise<VpcNatGatewayEntity>;
    remove(this: any, reqmatch?: VpcNatGatewayRemoveMatch, ctrl?: Control): Promise<VpcNatGatewayEntity>;
}
export { VpcNatGatewayEntity };
