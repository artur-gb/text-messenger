# text-messenger

This project is a Vue 3-based messaging application that utilizes SignalR for real-time communication and IonicVue for UI components

src/
├── components/        # Reusable UI components
├── pages/             # Application views or pages
├── router/            # Vue Router setup and route management
├── services/          # Services for API calls and SignalR integration
├── types/             # TypeScript types and interfaces

To run the code:
`npm install` then `npm run dev`

- The app will be available at http://localhost:5173
- The app connects to a SignalR hub located at http://localhost:3209/messenger/hub. It uses WebSocket as the transport to send and receive messages
- `sendMessageToUrl` method has been deprecated due to CORS issues with the HTTP API. Message sending is handled through SignalR instead
