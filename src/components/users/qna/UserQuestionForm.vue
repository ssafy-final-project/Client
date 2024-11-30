<script setup>
import { reactive, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useUserStore } from '@/stores/user';
import { registQna, updateQna, deleteQna } from '@/api/qna';
import { useRouter } from 'vue-router';
import { SuccessNotificationTopRight } from '@/components/common/Notification';

const { formInfo } = defineProps({
  formInfo: Object,
  status: {
    type: String,
    default: 'write',
  },
});

const router = useRouter();
const userStore = useUserStore();

const state = reactive({
  title: '',
  content: '',
  select: null,
});

watch(
  () => formInfo,
  () => {
    state.questionId = formInfo.questionId ?? '';
    state.title = formInfo.title ?? '';
    state.content = formInfo.content ?? '';
    state.select = formInfo.category ?? '서비스 이용문의';
    state.author = formInfo.author ?? '';
  }
);

const categorys = ['서비스 이용문의', '허위매물 신고', '단지정보 문의', '기타문의', '장애/오류 신고'];

const rules = {
  title: { required },
  content: { required },
  select: { required },
  // categorys: { required },
};

const v$ = useVuelidate(rules, state);

const write = async () => {
  const res = await v$.value.$validate();
  if (!res) return;
  registQna(
    { ...state, category: state.select, author: userStore.uidLogin },
    ({ data }) => {
      console.log(data);
      router.push('/user/question');
      SuccessNotificationTopRight('문의가 등록되었습니다');
    },
    (error) => console.log(error)
  );
};

const update = async () => {
  const res = await v$.value.$validate();
  if (!res) return;
  updateQna(
    { ...state, category: state.select },
    ({ data }) => {
      console.log('수정' + data);
      router.push('/user/question');
      SuccessNotificationTopRight('문의가 수정되었습니다');
    },
    (error) => console.log(error)
  );
};

const remove = async () => {
  const res = await v$.value.$validate();
  if (!res) return;
  if (!confirm('문의글이 지워집니다. 정말 삭제하시겠습니까?')) return;
  deleteQna(
    state.questionId,
    ({ data }) => {
      console.log('삭제' + data);
      router.push('/user/question');
      SuccessNotificationTopRight('문의가 삭제되었습니다');
    },
    (error) => console.log(error)
  );
};

function clear() {
  v$.value.$reset();

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
}
</script>

<template>
  <div>
    <RouterLink to="/user/question" class="inline-block d-flex mb-2">
      <v-icon icon="$prev"></v-icon>
      <span class="align-middle">목록으로</span>
    </RouterLink>
    <form>
      <v-text-field
        v-model="state.title"
        :counter="10"
        :error-messages="v$.title.$errors.map((e) => e.$message)"
        label="제목"
        required
        @blur="v$.title.$touch"
        @input="v$.title.$touch"
      ></v-text-field>

      <v-select
        v-model="state.select"
        :error-messages="v$.select.$errors.map((e) => e.$message)"
        :items="categorys"
        label="문의 유형"
        required
        @blur="v$.select.$touch"
        @change="v$.select.$touch"
      ></v-select>

      <v-textarea
        v-model="state.content"
        :counter="10"
        :error-messages="v$.content.$errors.map((e) => e.$message)"
        label="문의내용"
        required
        rows="5"
        @blur="v$.content.$touch"
        @input="v$.content.$touch"
      ></v-textarea>
      <div v-if="status === 'write'">
        <v-btn class="me-4" @click="write"> 작성완료 </v-btn>
        <v-btn @click="clear"> 초기화 </v-btn>
      </div>
      <div v-else-if="status === 'update'">
        <v-btn class="me-4" @click="update"> 수정 완료 </v-btn>
        <v-btn @click="remove"> 글 삭제 </v-btn>
      </div>
    </form>
  </div>
</template>

<style lang="css" scoped></style>
