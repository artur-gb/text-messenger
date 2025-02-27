import type { InjectionKey } from "vue";
import type { Message } from "../types/Message";

/**
 * IMessageService interface for working with messages through SignalR.
 */
export interface IMessageService {
  /**
   * Starts the connection to the server.
   * @returns {Promise<void>} A promise that resolves once the connection is established.
   */
  startConnection(): Promise<void>;

  /**
   * Registers a callback for handling incoming messages.
   * @param {function(Message): void} callback - The function that will be called when a new message is received.
   */
  onReceiveMessage: (callback: (message: Message) => void) => void;

  /**
   * Sends a message to the server.
   * ⚠️ **Not used** due to CORS issues with HTTP requests.
   * Messages are instead sent via WebSocket (SignalR).
   * @deprecated
   */
  sendMessageToUrl: (message: Message) => Promise<void>;

  /**
   * Sends a message to the server.
   * @param {...any[]} args - The arguments to be sent to the server.
   * @returns {Promise<void>} A promise that resolves once the message is sent.
   */
  sendMessage(...args: any[]): Promise<void>;

  /**
   * Stops the connection to the server.
   */
  stopConnection: () => void;
}

export const IMessageServiceKey = Symbol() as InjectionKey<IMessageService>;
