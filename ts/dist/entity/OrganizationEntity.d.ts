import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Organization, OrganizationListMatch, OrganizationCreateData } from '../DigitaloceanTypes';
declare class OrganizationEntity extends DigitaloceanEntityBase<Organization> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: OrganizationEntity): OrganizationEntity;
    list(this: any, reqmatch?: OrganizationListMatch, ctrl?: Control): Promise<OrganizationEntity[]>;
    create(this: any, reqdata?: OrganizationCreateData, ctrl?: Control): Promise<OrganizationEntity>;
}
export { OrganizationEntity };
