<template>
  <div class="grid grid-rows-8 h-100 gap-1">
    <div class="text-h5 col-span-full">글 상세 정보</div>
    <user-question-form
      :formInfo="article"
      status="update"
      class="col-span-full row-span-7 w-75 mx-auto"
    ></user-question-form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getQna } from "@/api/qna";
import UserQuestionForm from "./UserQuestionForm.vue";

const route = useRoute();
console.log(route.params.qId);
const article = ref({});

watch(
  () => route.params.qId,
  (qNo) => {
    console.log("fetch!");
    fetchUserInfo(qNo);
  },
  { immediate: true }
);

async function fetchUserInfo(qId) {
  getQna(
    qId,
    ({ data }) => {
      console.log(data);
      article.value = data;
    },
    (error) => console.log(error)
  );
}
</script>
