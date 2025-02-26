import type { InjectionKey } from "vue";
// import { LogbookRecord } from "../entities/Logbook";

export interface IMessageService {
  startConnection(): Promise<void>;
  onReceiveMessage: (callback: (user: string, message: string) => void) => void;
  sendMessage: (user: string, message: string) => Promise<void>;
  stopConnection: () => void;
}

export const IMessageServiceKey = Symbol() as InjectionKey<IMessageService>;
