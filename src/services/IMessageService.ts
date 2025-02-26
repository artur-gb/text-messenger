import type { InjectionKey } from "vue";
import type { Message } from "../types/Message";

export interface IMessageService {
  startConnection(): Promise<void>;
  onReceiveMessage: (callback: (message: Message) => void) => void;
  sendMessage: (message: Message) => Promise<void>;
  stopConnection: () => void;
}

export const IMessageServiceKey = Symbol() as InjectionKey<IMessageService>;
