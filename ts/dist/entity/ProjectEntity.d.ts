import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Project, ProjectLoadMatch, ProjectListMatch, ProjectCreateData, ProjectUpdateData, ProjectPatchData, ProjectRemoveMatch } from '../DigitaloceanTypes';
declare class ProjectEntity extends DigitaloceanEntityBase<Project> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ProjectEntity): ProjectEntity;
    load(this: any, reqmatch?: ProjectLoadMatch, ctrl?: Control): Promise<ProjectEntity>;
    list(this: any, reqmatch?: ProjectListMatch, ctrl?: Control): Promise<ProjectEntity[]>;
    create(this: any, reqdata?: ProjectCreateData, ctrl?: Control): Promise<ProjectEntity>;
    update(this: any, reqdata?: ProjectUpdateData, ctrl?: Control): Promise<ProjectEntity>;
    patch(this: any, reqdata?: ProjectPatchData, ctrl?: Control): Promise<ProjectEntity>;
    remove(this: any, reqmatch?: ProjectRemoveMatch, ctrl?: Control): Promise<ProjectEntity>;
}
export { ProjectEntity };
