<script setup>
import { priceToUkFull } from "@/maps/util";
defineProps({
  statInfo: Object,
});
</script>

<template>
  <div class="absolute left-10 bottom-3 z-30 w-28">
    <el-carousel
      direction="vertical"
      height="180px"
      type="card"
      :autoplay="true"
      :interval="3000"
      :pause-on-hover="true"
      indicator-position="none"
    >
      <el-carousel-item
        class="bg-gradient-to-r from-blue-400 to-indigo-500 text-center text-white max-h-fit w-32 p-2 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
      >
        <div class="font-semibold text-md mb-2 text-cyan-200">거래량</div>
        <div class="text-sm text-white">{{ statInfo?.dealCount + "건" }}</div>
      </el-carousel-item>
      <el-carousel-item
        class="bg-gradient-to-r from-blue-400 to-indigo-500 text-center text-white max-h-fit w-32 p-2 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
      >
        <div class="font-semibold text-md mb-2 text-cyan-200">최저가</div>
        <div class="text-sm text-white">{{ priceToUkFull(statInfo?.minPrice) }}</div>
      </el-carousel-item>
      <el-carousel-item
        class="bg-gradient-to-r from-blue-400 to-indigo-500 text-center text-white max-h-fit w-32 p-2 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
      >
        <div class="font-semibold text-md mb-2 text-cyan-200">최고가</div>
        <div class="text-sm text-white">{{ priceToUkFull(statInfo?.maxPrice) }}</div>
      </el-carousel-item>
      <el-carousel-item
        class="bg-gradient-to-r from-blue-400 to-indigo-500 text-center text-white max-h-fit w-32 p-2 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
      >
        <div class="font-semibold text-md mb-2 text-cyan-200">평균가</div>
        <div class="text-sm text-white">{{ priceToUkFull(statInfo?.avgPrice) }}</div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style lang="css" scoped></style>
