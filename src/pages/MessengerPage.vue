<template>
  <div class="chat-container">
    <div class="messages-container">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="{
          sent: msg.user === nickname,
          received: msg.user !== nickname,
        }"
      >
        <message-blob-component
          :sender="msg.user"
          :text="msg.text"
          :date="msg.timestamp"
          :is-sent-by-me="msg.user === nickname"
        />
      </div>
    </div>

    <div class="message-input-container">
      <ion-input
        v-model="text"
        type="text"
        placeholder="Enter text..."
        class="message-input"
      />
      <ion-button @click="sendMessage" class="send-button">Send</ion-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonInput, IonButton } from "@ionic/vue";
import { ref, onMounted, onUnmounted, computed } from "vue";
import MessageBlobComponent from "../components/MessageBlobComponent.vue";
import { useMessageService } from "../services/useMessageService";
import type { Message } from "../types/Message";

const messageService = useMessageService();

const user = ref("");
const text = ref("");

const nickname = computed(() => window.localStorage.getItem("nickname") || "");

const messages = ref<Message[]>([]);

const sendMessage = async () => {
  // const timestamp = new Date().toISOString();

  if (text.value.trim()) {
    await messageService.sendMessage(user.value, text.value);
    // await messageService.sendMessage({
    //   user: user.value,
    //   text: text.value,
    //   timestamp: timestamp,
    // });
    text.value = "";
  }
};

onMounted(async () => {
  user.value = window.localStorage.getItem("nickname") || "";
  
  await messageService.startConnection();

  messageService.onReceiveMessage((message: Message) => {
    messages.value.push(message);
  });
});

onUnmounted(() => {
  messageService.stopConnection();
});
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.sent {
  display: flex;
  justify-content: flex-end;
}

.received {
  display: flex;
  justify-content: flex-start;
}

.message-input-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  background: white;
}

.message-input {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: white;
}

.send-button {
  white-space: nowrap;
  padding: 10px 16px;
  border-radius: 8px;
}
</style>
