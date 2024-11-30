import { defineStore } from "pinia";
import { ref } from "vue";

export const useMapStore = defineStore("map", () => {
  const currentLevel = ref(0);

  function setLevel(level) {
    currentLevel.value = level;
  }
  return { currentLevel, setLevel };
});
