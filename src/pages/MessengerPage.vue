<template>
  <div>
    <div v-for="(msg, index) in messages" :key="index">
      <message-blob-component
        :sender="msg.user"
        :text="msg.text"
        :date="msg.timestamp"
      />
    </div>

    <input v-model="user" placeholder="Ваше имя" />
    <input
      v-model="text"
      placeholder="Введите сообщение"
      @keyup.enter="sendMessage"
    />
    <button @click="sendMessage">Отправить</button>
    <ion-input v-model="inputValue" type="text" placeholder="placeholder" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import MessageBlobComponent from "../components/MessageBlobComponent.vue";
import { useMessageService } from "../services/useMessageService";
import type { Message } from "../types/Message";

const messageService = useMessageService();

const user = ref("me");
const text = ref("");

const inputValue = ref("");

const messages = ref<Message[]>([
  {
    user: "iefje HHHNNfe",
    text: "dreaming aboutewv",
    timestamp: new Date().toISOString(),
  },
  {
    user: "me",
    text: "okay!",
    timestamp: new Date().toISOString(),
  },
]);

const sendMessage = async () => {
  const timestamp = new Date().toISOString();

  if (text.value.trim()) {
    await messageService.sendMessage({
      user: user.value,
      text: text.value,
      timestamp: timestamp,
    });
    text.value = "";
  }
};

onMounted(async () => {
  await messageService.startConnection();

  messageService.onReceiveMessage((message: Message) => {
    console.log(message);
    messages.value.push(message);
  });
});

onUnmounted(() => {
  messageService.stopConnection();
});
</script>
