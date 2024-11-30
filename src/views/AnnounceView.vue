<template>
  <div class="grid grid-rows-10 gap-0 h-100">
    <h1 class="font-bold self-center row-start-1 row-span-2 col-span-full text-center text-4xl">공지사항</h1>
    <!-- <NavList class="row-start-3 col-span-full">
      <RouterLink to="/announce" class="nav-item" id="myInfo">공지사항</RouterLink>
      <RouterLink to="/announce/faq" class="nav-item" id="myPick"
        >자주 묻는 질문</RouterLink
      >
    </NavList> -->
    <RouterView class="row-start-3 col-span-full"> </RouterView>
  </div>
</template>

<script setup>
import NavList from '@/components/layout/NavList.vue';
</script>
