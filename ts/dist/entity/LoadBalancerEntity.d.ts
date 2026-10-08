import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { LoadBalancer, LoadBalancerLoadMatch, LoadBalancerListMatch, LoadBalancerCreateData, LoadBalancerUpdateData, LoadBalancerRemoveMatch } from '../DigitaloceanTypes';
declare class LoadBalancerEntity extends DigitaloceanEntityBase<LoadBalancer> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: LoadBalancerEntity): LoadBalancerEntity;
    load(this: any, reqmatch?: LoadBalancerLoadMatch, ctrl?: Control): Promise<LoadBalancerEntity>;
    list(this: any, reqmatch?: LoadBalancerListMatch, ctrl?: Control): Promise<LoadBalancerEntity[]>;
    create(this: any, reqdata?: LoadBalancerCreateData, ctrl?: Control): Promise<LoadBalancerEntity>;
    update(this: any, reqdata?: LoadBalancerUpdateData, ctrl?: Control): Promise<LoadBalancerEntity>;
    remove(this: any, reqmatch?: LoadBalancerRemoveMatch, ctrl?: Control): Promise<LoadBalancerEntity>;
}
export { LoadBalancerEntity };
