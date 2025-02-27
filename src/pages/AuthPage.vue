<template>
  <div class="auth-container">
    <ion-item class="auth-input-form">
      <ion-label position="floating">Enter your nickname</ion-label>
      <ion-input v-model="nickname" placeholder="Your nickname" />
    </ion-item>
    <ion-button expand="block" @click="saveNickname">Save</ion-button>
  </div>
</template>

<script setup lang="ts">
import { IonInput, IonLabel, IonButton, IonItem } from "@ionic/vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const nickname = ref("");

const saveNickname = () => {
  if (nickname.value) {
    localStorage.setItem("nickname", nickname.value);
    router.push("/messenger");
  }
};

onMounted(() => {
  nickname.value = localStorage.getItem("nickname") || "";
});
</script>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
}

.auth-input-form {
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.auth-input-form ion-label {
  margin-bottom: 1rem;
  font-size: 14px;
}

ion-button {
  margin-top: 16px;
  max-width: 400px;
  width: 100%;
}
</style>
