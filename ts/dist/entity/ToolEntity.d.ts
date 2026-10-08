import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Tool, ToolLoadMatch, ToolListMatch } from '../DigitaloceanTypes';
declare class ToolEntity extends DigitaloceanEntityBase<Tool> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ToolEntity): ToolEntity;
    load(this: any, reqmatch?: ToolLoadMatch, ctrl?: Control): Promise<ToolEntity>;
    list(this: any, reqmatch?: ToolListMatch, ctrl?: Control): Promise<ToolEntity[]>;
}
export { ToolEntity };
