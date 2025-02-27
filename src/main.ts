import { createApp } from "vue";
import { IonicVue } from "@ionic/vue";
import "./style.css";
import App from "./App.vue";
import { IMessageServiceKey } from "./services/IMessageService";
import { MessageApiService } from "./services/MessageApiService";

import "@ionic/vue/css/core.css";
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";
import { router } from "./router";

/**
 * Initializes the Vue application and provides necessary services.
 *
 * This section does the following:
 * 1. Creates the Vue app instance.
 * 2. Provides an instance of `MessageApiService` to the app via `IMessageServiceKey`.
 * 3. Sets up and uses IonicVue and router for routing.
 * 4. Mounts the app to the DOM element with the id `#app`.
 */

const app = createApp(App);
app.provide(
  IMessageServiceKey,
  new MessageApiService(
    "http://localhost:3209/messenger/hub",
    "http://localhost:3209/api/messenger"
  )
);
app.use(IonicVue);
app.use(router);
app.mount("#app");
