import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Tag, TagLoadMatch, TagListMatch, TagCreateData, TagRemoveMatch } from '../DigitaloceanTypes';
declare class TagEntity extends DigitaloceanEntityBase<Tag> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: TagEntity): TagEntity;
    load(this: any, reqmatch?: TagLoadMatch, ctrl?: Control): Promise<TagEntity>;
    list(this: any, reqmatch?: TagListMatch, ctrl?: Control): Promise<TagEntity[]>;
    create(this: any, reqdata?: TagCreateData, ctrl?: Control): Promise<TagEntity>;
    remove(this: any, reqmatch?: TagRemoveMatch, ctrl?: Control): Promise<TagEntity>;
}
export { TagEntity };
