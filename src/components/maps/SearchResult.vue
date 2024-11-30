<script setup>
defineProps({
  dongs: {
    type: Array,
    default: [],
  },
});
</script>

<template>
  <div
    id="container"
    class="absolute top-0 left-0 overflow-auto bg-white max-h-80 min-h-52 min-w-fit rounded-b-lg"
    style="box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.15)"
  >
    <div class="px-5">
      <div class="font-semibold my-3 text-lg">법정동 이름 검색</div>
      <hr class="mb-4" />
      <div
        @click="$emit('mvDong', dong.latitude, dong.longitude)"
        class="mb-2 flex justify-between"
        v-for="(dong, index) in dongs"
        :key="index"
      >
        <span class="cursor-pointer hover:text-blue-400">{{
          dong.superName.concat(" ", dong.statName)
        }}</span>
        <v-btn size="x-small" class="hover:bg-blue-300 hover:text-neutral-50"
          >이동</v-btn
        >
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
#container {
  width: 300px;
  /* height: 400px; */
}
</style>
