import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Image, ImageLoadMatch, ImageListMatch, ImageCreateData, ImageUpdateData, ImageRemoveMatch } from '../DigitaloceanTypes';
declare class ImageEntity extends DigitaloceanEntityBase<Image> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ImageEntity): ImageEntity;
    load(this: any, reqmatch?: ImageLoadMatch, ctrl?: Control): Promise<ImageEntity>;
    list(this: any, reqmatch?: ImageListMatch, ctrl?: Control): Promise<ImageEntity[]>;
    create(this: any, reqdata?: ImageCreateData, ctrl?: Control): Promise<ImageEntity>;
    update(this: any, reqdata?: ImageUpdateData, ctrl?: Control): Promise<ImageEntity>;
    remove(this: any, reqmatch?: ImageRemoveMatch, ctrl?: Control): Promise<ImageEntity>;
}
export { ImageEntity };
