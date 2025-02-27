import * as signalR from "@microsoft/signalr";
import type { IMessageService } from "./IMessageService";
import type { Message } from "../types/Message";

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
      console.log("SignalR Connected!");
    } catch (error) {
      console.error("SignalR Connection Error: ", error);
      setTimeout(() => this.startConnection(), 5000);
    }
  }

  onReceiveMessage(callback: (message: Message) => void) {
    this.connection.on("ReceiveMessage", (user: string, text: string) => {
      const message: Message = {
        user,
        text,
        timestamp: new Date().toISOString(),
      };
      callback(message);
    });
  }

  // async sendMessage(message: Message): Promise<void> {
  //   try {
  //     console.log(message);
  //     const response = await fetch(`${this.apiUrl}/send`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(message),
  //       // mode: "no-cors",
  //     });

  //     if (!response.ok) {
  //       throw new Error("Error sending message");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async sendMessage(...args: any[]): Promise<void> {
    try {
      if (this.connection.state !== signalR.HubConnectionState.Connected) {
        console.error("SignalR is not connected");
        return;
      }

      await this.connection.invoke("SendMessage", ...args);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  stopConnection() {
    this.connection.stop();
  }
}
