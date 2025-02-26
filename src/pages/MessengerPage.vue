<template>
  <div>
    <div v-for="(msg, index) in messages" :key="index">
      <message-blob-component
        :sender="msg.sender"
        :text="msg.text"
        :date="msg.date"
      />
    </div>

    <input v-model="user" placeholder="Ваше имя" />
    <input
      v-model="text"
      placeholder="Введите сообщение"
      @keyup.enter="sendMessage"
    />
    <button @click="sendMessage">Отправить</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import MessageBlobComponent from "../components/MessageBlobComponent.vue";
import { useMessageService } from "../services/useMessageService";

const messageService = useMessageService();

const user = ref("me");
const text = ref("");
const messages = ref<{ sender: string; text: string; date: string }[]>([
  {
    sender: "iefje HHHNNfe",
    text: "dreaming aboutewv",
    date: "today",
  },
  {
    sender: "me",
    text: "okay!",
    date: "today",
  },
]);

const sendMessage = async () => {
  if (text.value.trim()) {
    await messageService.sendMessage(user.value, text.value);
    text.value = "";
  }
};

onMounted(async () => {
  await messageService.startConnection();

  messageService.onReceiveMessage((sender: string, text: string) => {
    messages.value.push({ sender, text, date: "today" });
  });
});

onUnmounted(() => {
  messageService.stopConnection();
});
</script>
