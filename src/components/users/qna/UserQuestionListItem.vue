<script setup>
import UserQuestionContent from "./UserQuestionContent.vue";

defineProps({
  questions: Array,
});

const headers = [
  // { title: "글 번호", align: "center", key: "questionId" },
  { title: "카테고리", align: "center", key: "category" },
  { title: "글 제목", align: "center", key: "title" },
  // { title: "작성자", align: "center", key: "author" },
  { title: "글 작성 시간", align: "center", key: "createdAt" },
  { title: "답변 상태", align: "end", key: "isResolved" },
];
</script>

<template>
  <div>
    <v-data-table-virtual
      :headers="headers"
      :items="questions"
      height="400"
      item-value="questionId"
      no-data-text="문의가 없습니다."
    >
      <!-- item 슬롯 활용 -->
      <template #item="{ item }">
        <tr
          class="cursor-pointer hover:bg-neutral-50"
          @click="() => (item.contentToggle = !item.contentToggle)"
        >
          <!-- <td>{{ item.questionId }}</td> -->
          <td class="font-semibold">{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <!-- <td>{{ item.author }}</td> -->
          <td>{{ item.createdAt }}</td>
          <td class="text-end text-slate-600" v-if="item.isResolved == 0">
            답변 대기 <v-icon icon="mdi-checkbox-blank-outline"></v-icon>
          </td>
          <td class="text-end text-blue-600" v-else="item.isResolved">
            답변 완료 <v-icon icon="mdi-checkbox-marked"></v-icon>
          </td>
        </tr>
        <tr v-if="item.contentToggle">
          <td colspan="4" class="px-0">
            <UserQuestionContent
              :content="item.content"
              :qNo="item.questionId"
            ></UserQuestionContent>
          </td>
        </tr>
      </template>
    </v-data-table-virtual>
  </div>
</template>

<style lang="css" scoped></style>
