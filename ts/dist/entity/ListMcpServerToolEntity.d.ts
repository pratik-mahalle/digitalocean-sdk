import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ListMcpServerTool, ListMcpServerToolListMatch, ListMcpServerToolUpdateData } from '../DigitaloceanTypes';
declare class ListMcpServerToolEntity extends DigitaloceanEntityBase<ListMcpServerTool> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ListMcpServerToolEntity): ListMcpServerToolEntity;
    list(this: any, reqmatch?: ListMcpServerToolListMatch, ctrl?: Control): Promise<ListMcpServerToolEntity[]>;
    update(this: any, reqdata?: ListMcpServerToolUpdateData, ctrl?: Control): Promise<ListMcpServerToolEntity>;
}
export { ListMcpServerToolEntity };
