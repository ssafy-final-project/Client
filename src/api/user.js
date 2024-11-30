import { localAxios } from "@/util/http-commons";

const local = localAxios();

function userLogin(param, success, fail) {
  local.post(`/member/jwt/login`, param).then(success).catch(fail);
}

function userSignUp(param, success, fail) {
  local.post(`/member`, param).then(success).catch(fail);
}

function userUpdate(param, success, fail) {
  local.put(`/member`, param).then(success).catch(fail);
}

function userDelete(userId, success, fail) {
  local.delete(`/member/${userId}`).then(success).catch(fail);
}

function getUserInfo(userId, success, fail) {
  local.get(`/member/info/${userId}`).then(success).catch(fail);
}

function checkUserId(userId, success, fail) {
  local.get(`/member/idchk/${userId}`).then(success).catch(fail);
}

export { userLogin, userSignUp, userUpdate, userDelete, getUserInfo, checkUserId };
