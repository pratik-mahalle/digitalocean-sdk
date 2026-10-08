import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Snapshot, SnapshotLoadMatch, SnapshotListMatch, SnapshotRemoveMatch } from '../DigitaloceanTypes';
declare class SnapshotEntity extends DigitaloceanEntityBase<Snapshot> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: SnapshotEntity): SnapshotEntity;
    load(this: any, reqmatch?: SnapshotLoadMatch, ctrl?: Control): Promise<SnapshotEntity>;
    list(this: any, reqmatch?: SnapshotListMatch, ctrl?: Control): Promise<SnapshotEntity[]>;
    remove(this: any, reqmatch?: SnapshotRemoveMatch, ctrl?: Control): Promise<SnapshotEntity>;
}
export { SnapshotEntity };
