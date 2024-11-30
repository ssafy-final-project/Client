<template>
  <div
    class="nrow"
    v-for="notice in notices"
    :key="notice.notice_no"
    @click="() => (notice.contentToggle = !notice.contentToggle)"
  >
    <div class="d-flex justify-between mt-3 py-3 mx-5 border-b">
      <div class="ntitle">[공지사항] {{ notice.title }}</div>
      <div class="ndate">{{ notice.notice_date }}</div>
    </div>
    <AnnounceContent v-if="notice.contentToggle" :content="notice.content"></AnnounceContent>
  </div>
</template>

<script setup>
import AnnounceContent from './AnnounceContent.vue';

defineProps(['notices']);
</script>

<style scoped>
.nrow {
  cursor: pointer;
}
</style>
