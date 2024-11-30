<template>
  <div class="grid h-100 grid-rows-10 gap-0">
    <div class="col-span-full row-span-9">
      <RouterView></RouterView>
    </div>
    <div class="col-span-full row-span-1">
      <UserFooter></UserFooter>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import UserFooter from "@/components/layout/UserFooter.vue";
</script>
