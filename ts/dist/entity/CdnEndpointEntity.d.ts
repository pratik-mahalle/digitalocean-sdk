import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { CdnEndpoint, CdnEndpointLoadMatch, CdnEndpointListMatch, CdnEndpointCreateData, CdnEndpointUpdateData, CdnEndpointRemoveMatch } from '../DigitaloceanTypes';
declare class CdnEndpointEntity extends DigitaloceanEntityBase<CdnEndpoint> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: CdnEndpointEntity): CdnEndpointEntity;
    load(this: any, reqmatch?: CdnEndpointLoadMatch, ctrl?: Control): Promise<CdnEndpointEntity>;
    list(this: any, reqmatch?: CdnEndpointListMatch, ctrl?: Control): Promise<CdnEndpointEntity[]>;
    create(this: any, reqdata?: CdnEndpointCreateData, ctrl?: Control): Promise<CdnEndpointEntity>;
    update(this: any, reqdata?: CdnEndpointUpdateData, ctrl?: Control): Promise<CdnEndpointEntity>;
    remove(this: any, reqmatch?: CdnEndpointRemoveMatch, ctrl?: Control): Promise<CdnEndpointEntity>;
}
export { CdnEndpointEntity };
