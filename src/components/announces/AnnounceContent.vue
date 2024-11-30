<template>
  <div class="d-flex flex-col mx-5 pl-5 pt-4 py-10 gap-y-2 bg-slate-50">
    <div v-for="line in lines">
      <div id="global" class="text-sm content" v-html="content"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const { content } = defineProps(["content"]);
// console.log(content);

const lines = ref([]);
lines.value = [...content.split("\n")];
</script>

<style scoped>
#global * {
  all: revert;
}

#global p {
  margin: 0px;
}
</style>
