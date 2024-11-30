<template>
  <div class="p-3 d-flex flex-col mx-auto w-75 gap-y-5">
    <div id="thead" class="p-2 border-t-2 border-b grid grid-cols-10 grid-rows-1">
      <div class="font-semibold py-2 col-span-8 text-center">제목</div>
      <div class="font-semibold py-2 col-span-2 text-center">날짜</div>
    </div>
    <div class="tbody">
      <AnnounceListItem :notices="notices"></AnnounceListItem>
      <!-- v-show로 글 내용 여기에 쓰기 -->
    </div>
    <div class="text-center">
      <v-pagination
        :length="maxPage"
        :total-visible="5"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
        v-model="page"
      ></v-pagination>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import { listArticle, getNoticeCount } from '@/api/announce';
import AnnounceListItem from './AnnounceListItem.vue';

const notices = ref([]);
const page = ref(1);
const maxPage = ref(0);

onMounted(() => {
  getNoticeCount(
    ({ data }) => {
      maxPage.value = parseInt(data / 10) + 1;
    },
    (err) => console.log(err)
  );
});

watchEffect(() => {
  listArticle(
    { pageno: page.value },
    (response) => {
      // console.log(response);
      // console.log(response.data.list);
      const { data } = response;
      // let list = data.list;
      notices.value = [
        ...data.list.map((notice) => {
          return {
            title: notice.title,
            notice_date: notice.notice_date,
            content: notice.content,
            contentToggle: false,
          };
        }),
      ];
      // console.log(notices.value);
      // notices.value = data.list;
    },
    (error) => console.log(error)
  );
});
</script>
