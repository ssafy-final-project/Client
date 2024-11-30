<script setup>
import { ref, watchEffect } from 'vue';

const { dongName } = defineProps({
  dongName: String,
});

const currDong = ref('');

watchEffect(() => (currDong.value = dongName));
</script>

<template>
  <div class="absolute bottom-7 z-30">
    <v-btn
      class="large font-black text-black-500 bg-white"
      append-icon="mdi-home-city"
      min-width="fit-content"
      rounded="xl"
    >
      <template v-slot:append>
        <v-icon color=""></v-icon>
      </template>
      {{ currDong }}</v-btn
    >
  </div>
</template>

<style lang="css" scoped></style>
