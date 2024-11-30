<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-3 py-6 lg:px-8">
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="signUp" class="space-y-6">
        <div>
          <label for="id" class="block text-sm/6 font-medium text-gray-900">아이디</label>
          <div class="mt-2">
            <input
              v-model="userInfo.id"
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
            <label for="password" class="block text-sm/6 font-medium text-gray-900"
              >비밀번호</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="userInfo.pw"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required=""
              class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="name" class="block text-sm/6 font-medium text-gray-900"
              >이름</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="userInfo.name"
              id="name"
              name="name"
              type="name"
              autocomplete="current-name"
              required=""
              class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="phone" class="block text-sm/6 font-medium text-gray-900"
              >전화번호</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="userInfo.phone"
              id="phone"
              name="phone"
              type="text"
              autocomplete="on"
              required=""
              class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="address" class="block text-sm/6 font-medium text-gray-900"
              >주소</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="userInfo.address"
              id="address"
              name="address"
              type="address"
              autocomplete="on"
              required=""
              class="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { userSignUp } from "@/api/user";
import { useRouter } from "vue-router";

const router = useRouter();
const userInfo = reactive({
  id: "",
  pw: "",
  name: "",
  phone: "",
  address: "",
});

function signUp() {
  userSignUp(
    userInfo,
    ({ data }) => {
      console.log(data);
      if (data === 1) {
        alert("회원가입 성공적으로 완료!");
        router.push({ name: "login" });
      }
    },
    (error) => console.log(error)
  );
}
</script>

<style scoped>
main {
  padding: 80px 70px;
  border-radius: 5%;
  /* background-color: #fff; */
}

form > div {
  margin-bottom: 10px;
}
</style>
