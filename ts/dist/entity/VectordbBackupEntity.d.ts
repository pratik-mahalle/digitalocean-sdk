import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { VectordbBackup, VectordbBackupListMatch } from '../DigitaloceanTypes';
declare class VectordbBackupEntity extends DigitaloceanEntityBase<VectordbBackup> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: VectordbBackupEntity): VectordbBackupEntity;
    list(this: any, reqmatch?: VectordbBackupListMatch, ctrl?: Control): Promise<VectordbBackupEntity[]>;
}
export { VectordbBackupEntity };
