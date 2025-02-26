<template>
  <ion-item>
    <ion-label position="floating">Enter your nickname</ion-label>
    <ion-input v-model="nickname" placeholder="Your nickname" />
  </ion-item>
  <ion-button @click="saveNickname">Save</ion-button>
</template>

<script setup lang="ts">
import { IonInput, IonLabel, IonButton, IonItem } from "@ionic/vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const nickname = ref("");

const saveNickname = () => {
  console.log(nickname.value);
  localStorage.setItem("nickname", nickname.value);
  router.push("/messenger");
};

onMounted(() => {
  nickname.value = localStorage.getItem("nickname") || "";
});
</script>
