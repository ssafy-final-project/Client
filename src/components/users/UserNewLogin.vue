<template>
  <div class="flex min-h-full flex-1 items-center justify-center px-6 py-12 lg:px-8 h-full">
    <!-- 전체 폼과 이미지를 감싸는 컨테이너 -->
    <div class="sm:mx-auto border rounded-lg shadow-md p-6 px-12 flex items-center">
      <!-- 이미지 섹션 -->
      <div class="flex justify-center">
        <iframe
          src="https://giphy.com/embed/5gtPbkUXor9BJQ2vVW"
          width="500"
          height="500"
          style="margin: -50px 50px -50px -80px; pointer-events: none"
          frameborder="0"
          class="giphy-embed"
          allowfullscreen
        ></iframe>
      </div>

      <!-- 입력 폼 섹션 -->
      <div>
        <form class="space-y-6" action="#" method="POST">
          <div>
            <label for="id" class="block text-sm font-medium text-gray-900">아이디</label>
            <div class="mt-2">
              <input
                v-model="id"
                id="id"
                name="id"
                type="text"
                autocomplete="id"
                required
                class="pl-3 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium text-gray-900">비밀번호</label>
            </div>
            <div class="mt-2">
              <input
                v-model="pw"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="pl-3 block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              />
            </div>
          </div>

          <div class="flex justify-center">
            <button
              @click.prevent="jwtlogin"
              type="submit"
              class="w-3/5 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              style="height: 30px; line-height: 50%"
            >
              로그인
            </button>
          </div>
        </form>

        <div class="flex justify-center">
          <button
            @click.prevent="kakaologin"
            type="submit"
            class="w-3/5 mt-2 items-center rounded-md text-sm font-semibold text-white shadow-md hover:brightness-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <img src="/src/assets/img/kakao_login_medium_wide.png" alt="Kakao Login" style="height: 30px" />
          </button>
        </div>

        <p class="mt-10 text-center text-sm text-gray-500">
          회원이 아니신가요?
          <RouterLink :to="{ name: 'signUp' }">
            <button class="font-semibold text-blue-600 hover:text-blue-500">지금 당장 홈넥트에 가입하세요!</button>
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { jwtLogin } from '@/api/jwt';
import { notificationBottomRight } from '../common/Notification';
import { oauthKakaoLogin } from '@/api/oauth';

const id = ref('');
const pw = ref('');
const userStore = useUserStore();
const router = useRouter();

function jwtlogin() {
  if (id.value.indexOf('_') >= 0) {
    const title = '로그인 오류';
    const message = '회원정보가 올바르지 않습니다';
    const type = 'error';
    notificationBottomRight({ title, message, type });
    return;
  }

  jwtLogin(
    { id: id.value, pw: pw.value },
    ({ data }) => {
      console.log(data);
      userStore.loginUser(id.value);
      router.replace('/');
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
}
</style>
