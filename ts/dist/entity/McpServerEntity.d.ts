import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { McpServer, McpServerLoadMatch, McpServerListMatch, McpServerCreateData, McpServerUpdateData, McpServerRemoveMatch } from '../DigitaloceanTypes';
declare class McpServerEntity extends DigitaloceanEntityBase<McpServer> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: McpServerEntity): McpServerEntity;
    load(this: any, reqmatch?: McpServerLoadMatch, ctrl?: Control): Promise<McpServerEntity>;
    list(this: any, reqmatch?: McpServerListMatch, ctrl?: Control): Promise<McpServerEntity[]>;
    create(this: any, reqdata?: McpServerCreateData, ctrl?: Control): Promise<McpServerEntity>;
    update(this: any, reqdata?: McpServerUpdateData, ctrl?: Control): Promise<McpServerEntity>;
    remove(this: any, reqmatch?: McpServerRemoveMatch, ctrl?: Control): Promise<McpServerEntity>;
}
export { McpServerEntity };
