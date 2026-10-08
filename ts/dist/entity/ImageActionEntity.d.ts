import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ImageAction, ImageActionListMatch } from '../DigitaloceanTypes';
declare class ImageActionEntity extends DigitaloceanEntityBase<ImageAction> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ImageActionEntity): ImageActionEntity;
    list(this: any, reqmatch?: ImageActionListMatch, ctrl?: Control): Promise<ImageActionEntity[]>;
}
export { ImageActionEntity };
