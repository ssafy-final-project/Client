import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";
import { jwtAuthenticate } from "@/api/jwt";
import { axiosJwtAuth } from "@/util/http-auth";

const routes = [
  {
    path: "/",
    // name: "Home",
    component: () => import("@/views/MainView.vue"),
    // redirect: { name: "map" },
    children: [
      {
        path: "",
        name: "map",
        component: () => import("@/views/MapView.vue"),
        children: [
          {
            path: "sidebar/:aptSeq",
            name: "sidebar",
            component: () => import("@/components/maps/SideBar.vue"),
          },
        ],
      },
      {
        path: "announce",
        // name: "announce",
        component: () => import("@/views/AnnounceView.vue"),
        // redirect: { name: "announceList" },
        children: [
          {
            path: "",
            name: "announceList",
            component: () => import("@/components/announces/AnnounceList.vue"),
          },
          {
            path: "faq",
            name: "faq",
            component: () =>
              import("@/components/announces/AnnounceFrequentQuestion.vue"),
          },
        ],
      },
      // {
      //   path: "qna",
      //   name: "qna",
      //   //임시
      //   component: () => import("@/views/AnnounceView.vue"),
      // },
      {
        path: "user",
        name: "user",
        component: () => import("@/views/UserView.vue"),
        children: [
          {
            path: "signUp",
            name: "signUp",
            // component: () => import("@/components/users/UserSignUp.vue"),
            component: () => import("@/components/users/UserNewSignUp.vue"),
          },
          {
            path: "login",
            name: "login",
            // component: () => import("@/components/users/UserLogin.vue"),
            component: () => import("@/components/users/UserNewLogin.vue"),
          },
          {
            path: "mypage",
            // name: "mypage",
            beforeEnter: () => axiosJwtAuth(),
            // redirect: { name: "userInfo" },
            component: () => import("@/components/users/UserMyPage.vue"),
            children: [
              {
                path: "",
                name: "userInfo",
                component: () => import("@/components/users/UserInfo.vue"),
              },
              {
                path: "userInfoRevise",
                name: "userInfoRevise",
                component: () => import("@/components/users/UserInfoRevise.vue"),
              },
              {
                path: "userFavorite",
                name: "userFavorite",
                component: () => import("@/components/users/UserFavorite.vue"),
              },
            ],
          },
          {
            path: "question",
            // name: "userQuestion",
            // redirect: { name: "qnaList" },
            component: () => import("@/views/QuestionView.vue"),
            children: [
              {
                path: "",
                name: "qnaList",
                component: () => import("@/components/users/qna/UserQuestionList.vue"),
              },
              {
                path: "register",
                name: "qnaRegister",
                component: () =>
                  import("@/components/users/qna/UserQuestionRegister.vue"),
              },
              {
                path: "detail/:qId",
                name: "qnaDetail",
                component: () => import("@/components/users/qna/UserQuestionDetail.vue"),
              },
            ],
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

// 전역 가드
router.beforeEach(async (to, from, next) => {
  // /user/mypage 및 /user/question 패턴에 대한 정규식
  const guardedRoutes = /^\/user\/(mypage|question)(\/.*)?$/;

  if (guardedRoutes.test(to.path)) {
    console.log(`Guard applied for: ${to.path}`);
    // 인증 로직 추가
    const result = await axiosJwtAuth();
    if (!result) {
      console.log("User not authenticated. Redirecting to login.");
      return next({ name: "login" }); // 로그인 화면으로 리다이렉트
    }
  }
  next(); // 다음 라우트로 이동
});

export default router;
