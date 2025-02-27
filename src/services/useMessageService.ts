import { inject } from "vue";
import { type IMessageService, IMessageServiceKey } from "./IMessageService";

/**
 * Custom hook to inject and retrieve the IMessageService instance.
 *
 * @returns {IMessageService} The injected IMessageService instance.
 * @throws {Error} Throws an error if the IMessageService is not provided in the context.
 */

export const useMessageService = () => {
  return inject(IMessageServiceKey) as IMessageService;
};
