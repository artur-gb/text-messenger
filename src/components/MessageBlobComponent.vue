<template>
  <div
    class="message-container"
    :class="{ sent: isSentByMe, received: !isSentByMe }"
  >
    <div class="message-header">
      <span class="sender">{{ sender }}</span>
      <span class="date">{{ date }}</span>
    </div>
    <div class="message-body">{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  sender: string;
  text: string;
  date: string;
  isSentByMe: boolean;
}>();
</script>

<style scoped>
.message-container {
  max-width: 90%;
  width: fit-content;
  padding: 10px;
  border-radius: 10px;
  margin: 5px 0;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.message-header {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
}

.sender {
  font-weight: bold;
}

.message-body {
  font-size: 14px;
  color: #333;
}

.sent {
  align-self: flex-end;
  background-color: #d1ecf1;
  border-bottom-right-radius: 0;
  text-align: right;
}

.received {
  align-self: flex-start;
  background-color: #f0f0f0;
  border-bottom-left-radius: 0;
  text-align: left;
}
</style>
