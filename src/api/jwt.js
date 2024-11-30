import { localAxios } from "@/util/http-commons";

const local = localAxios();

function jwtLogin(param, success, fail) {
  //Access Token은 Http-Only Cookie
  local
    .post(`/member/jwt/login`, param, { withCredentials: true })
    .then(success)
    .catch(fail);
}

async function jwtAuthenticate(success, fail) {
  return local.get(`/member/jwt/auth`).then(success).catch(fail);
}

export { jwtLogin, jwtAuthenticate };
