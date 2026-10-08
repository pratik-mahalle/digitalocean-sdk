import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { VpcSubnetsPublicPreview, VpcSubnetsPublicPreviewLoadMatch, VpcSubnetsPublicPreviewListMatch, VpcSubnetsPublicPreviewCreateData, VpcSubnetsPublicPreviewUpdateData, VpcSubnetsPublicPreviewRemoveMatch } from '../DigitaloceanTypes';
declare class VpcSubnetsPublicPreviewEntity extends DigitaloceanEntityBase<VpcSubnetsPublicPreview> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: VpcSubnetsPublicPreviewEntity): VpcSubnetsPublicPreviewEntity;
    load(this: any, reqmatch?: VpcSubnetsPublicPreviewLoadMatch, ctrl?: Control): Promise<VpcSubnetsPublicPreviewEntity>;
    list(this: any, reqmatch?: VpcSubnetsPublicPreviewListMatch, ctrl?: Control): Promise<VpcSubnetsPublicPreviewEntity[]>;
    create(this: any, reqdata?: VpcSubnetsPublicPreviewCreateData, ctrl?: Control): Promise<VpcSubnetsPublicPreviewEntity>;
    update(this: any, reqdata?: VpcSubnetsPublicPreviewUpdateData, ctrl?: Control): Promise<VpcSubnetsPublicPreviewEntity>;
    remove(this: any, reqmatch?: VpcSubnetsPublicPreviewRemoveMatch, ctrl?: Control): Promise<VpcSubnetsPublicPreviewEntity>;
}
export { VpcSubnetsPublicPreviewEntity };
