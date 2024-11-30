<template>
  <div>
    <v-card class="w-75 mx-auto">
      <Avatar :size="60" class="my-5 text-center w-100"></Avatar>
      <v-card-item class="card-item">
        <v-form @submit.prevent="updateUserInfo">
          <v-text-field
            disabled=""
            v-model="user.name"
            label="이름"
          ></v-text-field>
          <v-text-field v-model="user.phone" label="전화번호"></v-text-field>
          <v-text-field
            v-model="user.address"
            label="거주지 주소"
          ></v-text-field>
          <v-btn class="mt-2" type="submit" block>수정완료</v-btn>
        </v-form>
      </v-card-item>
    </v-card>
  </div>
</template>

<script setup>
import Avatar from "vue-boring-avatars";
import { useUserStore } from "@/stores/user";
import { reactive, ref } from "vue";
import { userUpdate } from "@/api/user";
import { useRouter } from "vue-router";
import { SuccessNotificationTopRight } from "../common/Notification";

const router = useRouter();
const userStore = useUserStore();
const { user } = userStore;

function updateUserInfo() {
  console.log(user);
  userUpdate(
    user,
    ({ data }) => {
      console.log(data);
      userStore.user.phone = user.phone;
      userStore.user.address = user.address;
      router.replace("/user/mypage");
      SuccessNotificationTopRight("회원정보 수정이 완료됐습니다");
    },
    (error) => console.log(error)
  );
}
</script>

<style scoped lang="scss">
.about {
  font-weight: bold;
}
</style>
