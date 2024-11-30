<script setup>
defineProps({
  length: {
    type: Number,
    default: 10,
  },

  page: {
    type: Number,
    default: 1,
  },
});
</script>

<template>
  <div class="text-center">
    <v-pagination
      :length="length"
      :total-visible="5"
      next-icon="mdi-menu-right"
      prev-icon="mdi-menu-left"
      :model-value="page"
    ></v-pagination>
  </div>
</template>

<style lang="css" scoped></style>
