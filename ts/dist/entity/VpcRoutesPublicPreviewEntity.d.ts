import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { VpcRoutesPublicPreview, VpcRoutesPublicPreviewListMatch, VpcRoutesPublicPreviewCreateData, VpcRoutesPublicPreviewUpdateData, VpcRoutesPublicPreviewRemoveMatch } from '../DigitaloceanTypes';
declare class VpcRoutesPublicPreviewEntity extends DigitaloceanEntityBase<VpcRoutesPublicPreview> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: VpcRoutesPublicPreviewEntity): VpcRoutesPublicPreviewEntity;
    list(this: any, reqmatch?: VpcRoutesPublicPreviewListMatch, ctrl?: Control): Promise<VpcRoutesPublicPreviewEntity[]>;
    create(this: any, reqdata?: VpcRoutesPublicPreviewCreateData, ctrl?: Control): Promise<VpcRoutesPublicPreviewEntity>;
    update(this: any, reqdata?: VpcRoutesPublicPreviewUpdateData, ctrl?: Control): Promise<VpcRoutesPublicPreviewEntity>;
    remove(this: any, reqmatch?: VpcRoutesPublicPreviewRemoveMatch, ctrl?: Control): Promise<VpcRoutesPublicPreviewEntity>;
}
export { VpcRoutesPublicPreviewEntity };
