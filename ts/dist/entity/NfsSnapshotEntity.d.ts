import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { NfsSnapshot, NfsSnapshotLoadMatch, NfsSnapshotListMatch } from '../DigitaloceanTypes';
declare class NfsSnapshotEntity extends DigitaloceanEntityBase<NfsSnapshot> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: NfsSnapshotEntity): NfsSnapshotEntity;
    load(this: any, reqmatch?: NfsSnapshotLoadMatch, ctrl?: Control): Promise<NfsSnapshotEntity>;
    list(this: any, reqmatch?: NfsSnapshotListMatch, ctrl?: Control): Promise<NfsSnapshotEntity[]>;
}
export { NfsSnapshotEntity };
