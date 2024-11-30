<template>
  <div>
    <v-btn @click="() => $router.push({ name: 'qnaRegister' })">글쓰기</v-btn>
    <div class="w-3/4 mx-auto">
      <user-question-list-item :questions="currArticles"></user-question-list-item>
      <Pagination :length="maxPage" :page="page"></Pagination>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { listQnaById } from "@/api/qna";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import UserQuestionListItem from "./UserQuestionListItem.vue";
import Pagination from "@/components/common/Pagination.vue";
import dayjs from "dayjs";

const PAGE_SIZE = 10;

const router = useRouter();
const userStore = useUserStore();
const page = ref(1);
const maxPage = ref(10);
const articles = ref([]);

const currArticles = computed(() => {
  // page - 1 * 보여줄 개수
  const start = PAGE_SIZE * (page.value - 1);
  return articles.value.slice(start, start + PAGE_SIZE);
});

onMounted(async () => {
  let articleLen = 0;
  console.log(userStore.uidLogin);
  await listQnaById(
    userStore.uidLogin,
    ({ data }) => {
      // console.log(data);
      articles.value = [
        ...data.map((article) => {
          const obj = { ...article };
          obj.createdAt = dayjs(article.createdAt).format("YYYY-MM-DD");
          obj.contentToggle = false;
          return obj;
        }),
      ];
      articleLen = articles.value.length;
      // console.log(articles.value);
      // articles.value = data;
    },
    (error) => console.log(error)
  );
  maxPage.value =
    articleLen % 10 == 0 ? articleLen / 10 : Math.floor(articleLen / 10) + 1;
});
</script>
