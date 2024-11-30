<template>
  <el-switch v-model="switchOn" active-text="탐색" inactive-text="조회" />
</template>

<script setup>
import { ref } from 'vue';
const switchOn = ref(true);
</script>

<style scoped>
.el-switch__label {
  font-weight: 800;
  font-size: larger;
}
</style>
