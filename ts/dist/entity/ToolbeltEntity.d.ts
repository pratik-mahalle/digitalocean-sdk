import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Toolbelt, ToolbeltLoadMatch, ToolbeltListMatch, ToolbeltCreateData, ToolbeltRemoveMatch } from '../DigitaloceanTypes';
declare class ToolbeltEntity extends DigitaloceanEntityBase<Toolbelt> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ToolbeltEntity): ToolbeltEntity;
    load(this: any, reqmatch?: ToolbeltLoadMatch, ctrl?: Control): Promise<ToolbeltEntity>;
    list(this: any, reqmatch?: ToolbeltListMatch, ctrl?: Control): Promise<ToolbeltEntity[]>;
    create(this: any, reqdata?: ToolbeltCreateData, ctrl?: Control): Promise<ToolbeltEntity>;
    remove(this: any, reqmatch?: ToolbeltRemoveMatch, ctrl?: Control): Promise<ToolbeltEntity>;
}
export { ToolbeltEntity };
