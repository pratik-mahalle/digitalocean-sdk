import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { VectordbRestoreBackup, VectordbRestoreBackupCreateData } from '../DigitaloceanTypes';
declare class VectordbRestoreBackupEntity extends DigitaloceanEntityBase<VectordbRestoreBackup> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: VectordbRestoreBackupEntity): VectordbRestoreBackupEntity;
    create(this: any, reqdata?: VectordbRestoreBackupCreateData, ctrl?: Control): Promise<VectordbRestoreBackupEntity>;
}
export { VectordbRestoreBackupEntity };
