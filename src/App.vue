<template>
  <div class="grid vh-100" style="row-gap: 0; --bs-rows: 14">
    <NavView class="g-col-12"></NavView>
    <RouterView class="g-col-12" style="grid-row: 2 / -1" />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import NavView from "./views/NavView.vue";
import { onMounted } from "vue";
import { axiosJwtAuth } from "./util/http-auth";

onMounted(() => {
  axiosJwtAuth();
});
</script>

<style>
* {
  box-sizing: border-box;
}
</style>
