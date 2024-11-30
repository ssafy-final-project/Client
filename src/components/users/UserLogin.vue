<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="id" class="block text-sm/6 font-medium text-gray-900">아이디</label>
          <div class="mt-2">
            <input
              v-model="id"
              id="id"
              name="id"
              type="text"
              autocomplete="id"
              required=""
              class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">비밀번호</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-blue-600 hover:text-blue-400">비밀번호를 잊어버리셨나요?</a>
            </div>
          </div>
          <div class="mt-2">
            <input
              v-model="pw"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required=""
              class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            />
          </div>
        </div>

        <div class="flex justify-center">
          <button
            @click.prevent="jwtlogin"
            type="submit"
            class="w-3/5 rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            로그인
          </button>
        </div>
      </form>

      <div class="flex justify-center">
        <button
          @click.prevent="kakaologin"
          type="submit"
          class="w-3/5 mt-2 items-center rounded-md text-sm/6 font-semibold text-white shadow-sm hover:brightness-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <img src="/src/assets/img/kakao_login_medium_wide.png" alt="Kakao Login" class="" />
        </button>
      </div>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        회원이 아니신가요?
        <RouterLink :to="{ name: 'signUp' }">
          <button class="font-semibold text-blue-600 hover:text-blue-500">지금 당장 홈넥트에 가입하세요!</button>
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { userLogin } from '@/api/user';
import { onMounted, reactive, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { jwtLogin } from '@/api/jwt';
import { notificationBottomRight, notificationTopRight } from '../common/Notification';
import { oauthKakaoLogin } from '@/api/oauth';

const id = ref('');
const pw = ref('');
const userStore = useUserStore();
const router = useRouter();

// function login() {
//   userLogin(
//     { id: id.value, pw: pw.value },
//     ({ data }) => {
//       console.log(data);
//       userStore.loginUser(data);
//       router.replace({ name: "map" });
//     },
//     (error) => {
//       console.log(error);
//     }
//   );
// }

function jwtlogin() {
  jwtLogin(
    { id: id.value, pw: pw.value },
    ({ data }) => {
      console.log(data);
      userStore.loginUser(id.value);
      router.replace('/');
      // notificationTopRight("로그인 성공")
    },
    (err) => {
      console.log(err);
      const title = '로그인 오류';
      const message = '회원정보가 올바르지 않습니다';
      const type = 'error';
      notificationBottomRight({ title, message, type });
    }
  );
}

function kakaologin() {
  oauthKakaoLogin();
}
</script>

<style scoped>
main {
  padding: 80px 50px 60px;
  border-radius: 5%;
  /* background-color: #fff; */
}
</style>
