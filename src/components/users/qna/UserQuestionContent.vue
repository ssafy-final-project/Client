<template>
  <div class="py-3 gap-y-2 bg-slate-50">
    <div class="font-bold my-2 text-start ms-5">문의 내용</div>
    <div v-for="line in lines">
      <div id="global" class="content ms-5 text-start">{{ line }}</div>
    </div>
    <div v-if="!isAnswerExist" class="d-flex me-5 justify-end gap-2">
      <v-btn size="small" @click="mvDetail(qNo)">수정</v-btn>
    </div>
    <div v-if="isAnswerExist">
      <v-divider class="my-3"></v-divider>
      <div class="font-bold my-3 text-start ms-5">답변 내용</div>
      <p class="text-start ms-5" v-html="answer.content"></p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { selectAnswer } from "@/api/answer";

const router = useRouter();
const { content, qNo = -1 } = defineProps(["content", "qNo"]);
const isAnswerExist = ref(false);
const answer = ref(null);
const lines = ref([]);
lines.value = [...content.split("\n")];

const mvDetail = (qId) => {
  router.push({ name: "qnaDetail", params: { qId: qId } });
};

onMounted(() => {
  selectAnswer(
    qNo,
    ({ data }) => {
      console.log(data);
      // 답변없으면 data가 ''로 날라옴
      console.log(typeof data);
      if (typeof data == "object") {
        isAnswerExist.value = true;
        answer.value = data;
      }
    },
    (err) => console.log(err)
  );
});
</script>

<style scoped>
#global * {
  all: revert;
}

#global p {
  margin: 0px;
}
</style>
