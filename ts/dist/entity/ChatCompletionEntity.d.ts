import { DigitaloceanEntityBase } from '../DigitaloceanEntityBase';
import type { DigitaloceanSDK } from '../DigitaloceanSDK';
import type { Control } from '../types';
import type { ChatCompletion, ChatCompletionCreateData } from '../DigitaloceanTypes';
declare class ChatCompletionEntity extends DigitaloceanEntityBase<ChatCompletion> {
    constructor(client: DigitaloceanSDK, entopts: any);
    make(this: ChatCompletionEntity): ChatCompletionEntity;
    create(this: any, reqdata?: ChatCompletionCreateData, ctrl?: Control): Promise<ChatCompletionEntity>;
}
export { ChatCompletionEntity };
