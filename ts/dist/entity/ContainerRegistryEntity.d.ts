import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ContainerRegistry, ContainerRegistryLoadMatch, ContainerRegistryListMatch, ContainerRegistryCreateData, ContainerRegistryUpdateData, ContainerRegistryRemoveMatch } from '../DigitaloceanTypes';
declare class ContainerRegistryEntity extends DigitaloceanEntityBase<ContainerRegistry> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ContainerRegistryEntity): ContainerRegistryEntity;
    load(this: any, reqmatch?: ContainerRegistryLoadMatch, ctrl?: Control): Promise<ContainerRegistryEntity>;
    list(this: any, reqmatch?: ContainerRegistryListMatch, ctrl?: Control): Promise<ContainerRegistryEntity[]>;
    create(this: any, reqdata?: ContainerRegistryCreateData, ctrl?: Control): Promise<ContainerRegistryEntity>;
    update(this: any, reqdata?: ContainerRegistryUpdateData, ctrl?: Control): Promise<ContainerRegistryEntity>;
    remove(this: any, reqmatch?: ContainerRegistryRemoveMatch, ctrl?: Control): Promise<ContainerRegistryEntity>;
}
export { ContainerRegistryEntity };
