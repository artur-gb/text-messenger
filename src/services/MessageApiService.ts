import * as signalR from "@microsoft/signalr";
import type { IMessageService } from "./IMessageService";

export class MessageApiService implements IMessageService {
  private connection: signalR.HubConnection;
  private apiUrl: string;

  constructor(hubUrl: string, apiUrl: string) {
    this.apiUrl = apiUrl;
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
  }

  async startConnection(): Promise<void> {
    try {
      await this.connection.start();
      console.log("✅ SignalR Connected!");
    } catch (error) {
      console.error("❌ SignalR Connection Error: ", error);
      setTimeout(() => this.startConnection(), 5000);
    }
  }

  onReceiveMessage(callback: (user: string, message: string) => void) {
    this.connection.on("ReceiveMessage", callback);
  }

  async sendMessage(user: string, message: string): Promise<void> {
    try {
      const timestamp = new Date().toISOString();
      await fetch(`${this.apiUrl}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, text: message, timestamp }),
        mode: "no-cors",
      });

      // if (!response.ok) {
      //   throw new Error("Error sending message");
      // }
    } catch (error) {
      console.error(error);
    }
  }

  stopConnection() {
    this.connection.stop();
  }
}
