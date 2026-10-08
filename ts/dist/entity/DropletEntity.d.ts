import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Droplet, DropletLoadMatch, DropletListMatch, DropletCreateData, DropletRemoveMatch } from '../DigitaloceanTypes';
declare class DropletEntity extends DigitaloceanEntityBase<Droplet> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: DropletEntity): DropletEntity;
    load(this: any, reqmatch?: DropletLoadMatch, ctrl?: Control): Promise<DropletEntity>;
    list(this: any, reqmatch?: DropletListMatch, ctrl?: Control): Promise<DropletEntity[]>;
    create(this: any, reqdata?: DropletCreateData, ctrl?: Control): Promise<DropletEntity>;
    remove(this: any, reqmatch?: DropletRemoveMatch, ctrl?: Control): Promise<DropletEntity>;
}
export { DropletEntity };
