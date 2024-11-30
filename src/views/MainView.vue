<template>
  <div class="relative">
    <RouterView class="g-col-12 position-relative" style="grid-row: 2 / -1" v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </RouterView>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style scoped></style>
