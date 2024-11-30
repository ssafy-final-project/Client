import { defineStore } from "pinia";
import { ElLoading } from "element-plus";

export const useLoadingStore = defineStore("loading", () => {
  const loadingInstance = () => {
    const instance = ElLoading.service({
      text: "Loading..",
      background: "rgba(0, 0, 0, 0.7)",
      lock: true,
    });
    return instance;
  };

  return { loadingInstance };
});
