import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { AssociatedKubernetesResource, AssociatedKubernetesResourceListMatch } from '../DigitaloceanTypes';
declare class AssociatedKubernetesResourceEntity extends DigitaloceanEntityBase<AssociatedKubernetesResource> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: AssociatedKubernetesResourceEntity): AssociatedKubernetesResourceEntity;
    list(this: any, reqmatch?: AssociatedKubernetesResourceListMatch, ctrl?: Control): Promise<AssociatedKubernetesResourceEntity[]>;
}
export { AssociatedKubernetesResourceEntity };
