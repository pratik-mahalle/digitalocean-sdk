import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Kubernete, KuberneteLoadMatch, KuberneteListMatch, KuberneteCreateData, KuberneteUpdateData, KuberneteRemoveMatch } from '../DigitaloceanTypes';
declare class KuberneteEntity extends DigitaloceanEntityBase<Kubernete> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: KuberneteEntity): KuberneteEntity;
    load(this: any, reqmatch?: KuberneteLoadMatch, ctrl?: Control): Promise<KuberneteEntity>;
    list(this: any, reqmatch?: KuberneteListMatch, ctrl?: Control): Promise<KuberneteEntity[]>;
    create(this: any, reqdata?: KuberneteCreateData, ctrl?: Control): Promise<KuberneteEntity>;
    update(this: any, reqdata?: KuberneteUpdateData, ctrl?: Control): Promise<KuberneteEntity>;
    remove(this: any, reqmatch?: KuberneteRemoveMatch, ctrl?: Control): Promise<KuberneteEntity>;
}
export { KuberneteEntity };
