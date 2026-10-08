import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ProjectResource, ProjectResourceListMatch, ProjectResourceCreateData } from '../DigitaloceanTypes';
declare class ProjectResourceEntity extends DigitaloceanEntityBase<ProjectResource> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ProjectResourceEntity): ProjectResourceEntity;
    list(this: any, reqmatch?: ProjectResourceListMatch, ctrl?: Control): Promise<ProjectResourceEntity[]>;
    create(this: any, reqdata?: ProjectResourceCreateData, ctrl?: Control): Promise<ProjectResourceEntity>;
}
export { ProjectResourceEntity };
