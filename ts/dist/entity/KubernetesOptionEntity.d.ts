import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { KubernetesOption, KubernetesOptionLoadMatch } from '../DigitaloceanTypes';
declare class KubernetesOptionEntity extends DigitaloceanEntityBase<KubernetesOption> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: KubernetesOptionEntity): KubernetesOptionEntity;
    load(this: any, reqmatch?: KubernetesOptionLoadMatch, ctrl?: Control): Promise<KubernetesOptionEntity>;
}
export { KubernetesOptionEntity };
