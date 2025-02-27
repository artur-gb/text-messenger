/**
 * Type for chat message.
 */
export type Message = {
  /**
   * The user who sent the message.
   * @type {string}
   */
  user: string;

  /**
   * The content of the message.
   * @type {string}
   */
  text: string;

  /**
   * The timestamp when the message was sent.
   * @type {string}
   * @example "2025-02-27T12:00:00Z"
   */
  timestamp: string;
};
