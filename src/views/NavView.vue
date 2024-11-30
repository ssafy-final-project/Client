<template>
  <div class="container-fluid">
    <nav
      class="h-100 d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 border-bottom"
    >
      <div class="col-md-3 mb-2 mb-md-0 items-center flex gap-3">
        <RouterLink to="/" class="flex-none nav-link text-lg text-blue-600" id="home">&copy; 홈넥트</RouterLink>
        <el-autocomplete
          v-if="route.name == 'map'"
          v-model="search"
          :fetch-suggestions="fetchMathcedDong"
          value-key="fullJuso"
          placeholder="동 이름을 검색하세요"
          :debounce="400"
          :clearable="true"
          :highlight-first-item="true"
          @select="mvDong"
          @blur="statStore.isSelected = false"
        >
          <template #suffix>
            <el-icon><Search color="gray" class="cursor-pointer" /></el-icon>
          </template>
        </el-autocomplete>
        <!-- <v-toolbar dense class="flex-auto" height="40" rounded="xl">
          <v-text-field
            clearable
            append-icon="mdi-magnify"
            single-line
            hide-details
            rounded="pill"
            bg-color="neutral"
            v-model="search"
          >
          </v-text-field>
        </v-toolbar> -->
      </div>
      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li class="nav-item">
          <RouterLink to="/" class="nav-link px-2 link-secondary">지도</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/announce" class="nav-link px-2 link-secondary">공지사항</RouterLink>
        </li>
        <!-- <li class="nav-item">
          <RouterLink :to="{ name: 'qna' }" class="nav-link px-2 link-secondary"
            >Q&amp;A</RouterLink
          >
        </li> -->
      </ul>
      <div class="col-md-3 text-end d-flex justify-content-end">
        <template v-if="!userStore.isLogin">
          <RouterLink :to="{ name: 'signUp' }" class="nav-link">회원가입</RouterLink>
          <RouterLink :to="{ name: 'login' }" class="nav-link">로그인</RouterLink>
        </template>
        <template v-else>
          <a class="nav-link" @click="logout">로그아웃</a>
          <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
              <div v-bind="props" class="nav-item d-flex align-items-center ms-3" id="userInfo">
                <span class="hover:bg-white">{{ shortUid }} 님</span>
                <i class="bi bi-person-circle fs-4"></i>
              </div>
            </template>
            <v-list>
              <v-list-item v-for="(menu, index) in menus" :key="index">
                <RouterLink :to="menu.path">{{ menu.name }}</RouterLink>
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- <RouterLink to="/user/mypage" class="nav-link">마이페이지</RouterLink> -->
        </template>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useRouter, useRoute } from 'vue-router';
import { computed, ref, watch } from 'vue';
import { useStatStore } from '@/stores/statStore';
import { debounce } from 'lodash';
import { useLoadingStore } from '@/stores/loading';

const statStore = useStatStore();
const userStore = useUserStore();
const { loadingInstance } = useLoadingStore();
const router = useRouter();
const route = useRoute();
const search = ref('');

const cachedSearchResult = new Map();
const shortUid = computed(() => {
  return userStore.uidLogin.length <= 10 ? userStore.uidLogin : userStore.uidLogin.substring(0, 10) + '...';
});

const menus = ref([
  {
    path: '/user/mypage',
    name: '마이페이지',
  },
  {
    path: '/user/question',
    name: '1:1문의',
  },
]);

const fetchMathcedDong = (pattern) => {
  if (pattern != null && pattern.length >= 2) {
    // 캐시된 결과가 있다면 바로 사용
    // if (cachedSearchResult.has(pattern)) return cachedSearchResult.get(pattern);

    const result = statStore.findMatchedDong(pattern);
    // cachedSearchResult.set(pattern, result);
    return result;
    // return statStore.findMatchedDong(pattern);
    // console.log(matchedDong);
  } else {
    // statStore.isDataExist = false;
    return [];
  }
};

var loader;

const mvDong = () => {
  loader = loadingInstance();
  statStore.setSelectedDong(search.value);
  statStore.setSelected(true);
  // await loader.close();
  console.log(search.value);
};

watch(
  () => statStore.moveFlag,
  (newValue) => {
    if (newValue) {
      loader.close();
      statStore.setMoveFlag(false);
    }
  }
);

// watch(
//   search,
//   debounce((pattern) => {
//     if (pattern != null && pattern.length >= 2) {
//       statStore.findMatchedDong(pattern);
//       // console.log(matchedDong);
//     } else {
//       statStore.isDataExist = false;
//     }
//   }, 800)
// );

function logout() {
  userStore.logoutUser();
  router.push({ name: 'login' });
}
</script>

<style scoped lang="scss">
#home {
  // font-family: "Nanum Brush Script", cursive;

  &:hover {
    background-color: white;
  }
}

a,
span {
  padding: 8px 12px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
    transition: background-color 0.3s ease;
    // color: $primary-color;
  }
}

ul {
  li {
    font-size: large;
    margin-right: 5px;
  }
}

.router-link-active,
i {
  color: $primary-color;
}

i {
  margin-left: -5px;
}
</style>
