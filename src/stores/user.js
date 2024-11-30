import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { getRandomImg } from "@/api/randomUser";

export const useUserStore = defineStore("user", () => {
  const user = ref({
    id: "",
    pw: "",
    name: "",
    address: "",
    phone: "",
    img: "",
  });

  const uidLogin = ref("");
  const isLogin = ref(false);
  const userType = computed(() => {
    const underbar = uidLogin.value.indexOf("_");
    if (underbar === -1) return "";
    return uidLogin.value.substring(0, underbar);
  });

  const loginUser = (paramUser) => {
    uidLogin.value = paramUser;
    isLogin.value = true;
    // uidLogin.value.img = getRandomImg();
  };

  const logoutUser = () => {
    uidLogin.value = "";
    isLogin.value = false;
    // uidLogin.value.img = "";
  };

  const setUserInfo = (uinfo) => {
    user.value = uinfo;
  };

  return {
    uidLogin,
    isLogin,
    user,
    userType,
    loginUser,
    logoutUser,
    setUserInfo,
  };
});
