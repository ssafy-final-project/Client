<template>
  <div class="h-100 grid grid-rows-10 mx-auto my-auto w-75 text-center">
    <h2 id="title" class="text-h3 col-span-full row-start-1 mt-10">MY PAGE</h2>
    <nav id="nav" class="d-flex mx-auto col-span-full row-start-3">
      <RouterLink to="/user/mypage" class="nav-item" id="myInfo">내 정보</RouterLink>
      <!-- <RouterLink :to="{ name: 'userFavorite' }" class="nav-item" id="myPick"
        >관심 목록</RouterLink
      > -->
      <RouterLink to="/user/question" class="nav-item" id="myQuestion"
        >1:1 문의</RouterLink
      >
    </nav>
    <RouterView class="row-start-4 row-span-5 col-span-full"></RouterView>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from "vue-router";
</script>

<style scoped lang="scss">
.nav-item {
  width: 200px;
  height: 60px;
  border: 1px solid lightgrey;
  border-right: none;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: black;

  &:last-child {
    border-right: 1px solid lightgrey;
  }
}

.router-link-active {
  background-color: #121212;
  color: whitesmoke;
}
</style>
