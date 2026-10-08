import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { Action, ActionLoadMatch, ActionListMatch } from '../DigitaloceanTypes';
declare class ActionEntity extends DigitaloceanEntityBase<Action> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ActionEntity): ActionEntity;
    load(this: any, reqmatch?: ActionLoadMatch, ctrl?: Control): Promise<ActionEntity>;
    list(this: any, reqmatch?: ActionListMatch, ctrl?: Control): Promise<ActionEntity[]>;
}
export { ActionEntity };
