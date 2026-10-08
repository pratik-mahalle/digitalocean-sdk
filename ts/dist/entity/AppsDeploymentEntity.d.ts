import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { AppsDeployment, AppsDeploymentLoadMatch, AppsDeploymentListMatch, AppsDeploymentCreateData } from '../DigitaloceanTypes';
declare class AppsDeploymentEntity extends DigitaloceanEntityBase<AppsDeployment> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: AppsDeploymentEntity): AppsDeploymentEntity;
    load(this: any, reqmatch?: AppsDeploymentLoadMatch, ctrl?: Control): Promise<AppsDeploymentEntity>;
    list(this: any, reqmatch?: AppsDeploymentListMatch, ctrl?: Control): Promise<AppsDeploymentEntity[]>;
    create(this: any, reqdata?: AppsDeploymentCreateData, ctrl?: Control): Promise<AppsDeploymentEntity>;
}
export { AppsDeploymentEntity };
