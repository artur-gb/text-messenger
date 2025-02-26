import { inject } from "vue";
import { type IMessageService, IMessageServiceKey } from "./IMessageService";

export const useMessageService = () => {
  return inject(IMessageServiceKey) as IMessageService;
};
