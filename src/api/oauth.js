import { localAxios } from "@/util/http-commons";

const local = localAxios();

// param : pageno (number)
async function oauthKakaoLogin(before_redirect, fail) {
  return local
    .get("/member/oauth/kakao")
    .then(({ data }) => {
      if (before_redirect) before_redirect(data);
      window.location.href = data.redirectUrl;
    })
    .catch(fail);
}

export { oauthKakaoLogin };
