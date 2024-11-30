<template>
  <div>
    <v-card class="w-75 mx-auto">
      <v-img :src="userStore.user.img"></v-img>
      <Avatar :size="60" name="Helen Keller" class="my-5 text-center w-100"></Avatar>
      <v-card-item class="card-item">
        <div class="d-flex flex-column">
          <div class="d-flex m-3">
            <span class="me-auto about">이름</span>
            <span>{{ user.name }}</span>
          </div>
          <div class="d-flex m-3">
            <span class="me-auto about">휴대폰 번호</span>
            <span>{{ user.phone }}</span>
          </div>
        </div>
      </v-card-item>
      <v-card-actions class="mt-3 d-flex justify-end">
        <v-btn @click="handleRevise" rounded="0" variant="text" color="blue-grey-darken-3"
          >회원정보 수정</v-btn
        >
        <UserPwConfirmDialog
          @close-dialog="handleDialog"
          :isActive="isActive"
          class="d-none"
        ></UserPwConfirmDialog>
      </v-card-actions>
      <v-divider></v-divider>
      <div class="d-flex justify-center my-2">
        <v-btn
          @click="isDeleteDialogActive = true"
          size="small"
          variant="text"
          color="red-darken-3"
          >회원 탈퇴</v-btn
        >
        <UserDeleteConfrimDialog
          @close-dialog="handleDeleteDialog"
          :isActive="isDeleteDialogActive"
          class="d-none"
        ></UserDeleteConfrimDialog>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import Avatar from "vue-boring-avatars";
import UserPwConfirmDialog from "./UserPwConfirmDialog.vue";
import UserDeleteConfrimDialog from "./UserDeleteConfrimDialog.vue";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userDelete, userLogin, getUserInfo } from "@/api/user";
import { SuccessNotificationTopRight } from "../common/Notification";

const router = useRouter();
const userStore = useUserStore();
const isActive = ref(false);
const isDeleteDialogActive = ref(false);
const user = ref({
  id: "",
  name: "",
  phone: "",
  address: "",
});

function handleRevise() {
  if (userStore.userType == "kakao") {
    router.push({ name: "userInfoRevise" });
  } else {
    isActive.value = true;
  }
}

getUserInfo(userStore.uidLogin, ({ data }) => {
  user.value = data;
  userStore.setUserInfo(user.value);
});

function handleDialog(action, password) {
  isActive.value = false;
  if (action === "save") {
    console.log(password);
    userLogin(
      { id: userStore.uidLogin, pw: password },
      ({ data }) => {
        console.log(data);
        router.push({ name: "userInfoRevise" });
      },
      (error) => console.log(error)
    );
  }
}

function handleDeleteDialog(action) {
  if (action === "delete") {
    // delete axios
    userDelete(
      userStore.user.id,
      ({ data }) => {
        console.log(data);
        SuccessNotificationTopRight("회원정보 삭제가 완료돼었습니다");
      },
      (error) => console.log(error)
    );
    router.push({ name: "login" });
  }
  isDeleteDialogActive.value = false;
}
</script>

<style scoped lang="scss">
.about {
  font-weight: bold;
}
</style>
