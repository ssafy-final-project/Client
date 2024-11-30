import { localAxios } from "@/util/http-commons";

const local = localAxios();

// param : pageno (number)
// function listAnswer(param, success, fail) {
//   local.get(`/qna`, { params: param }).then(success).catch(fail);
// }

// function getQnaCount(success, fail) {
//   local.get(`/qna/count`).then(success).catch(fail);
// }

function selectAnswer(qNo, success, fail) {
  return local.get(`/qna/answer/${qNo}`).then(success).catch(fail);
}

function registAnswer(answer, success, fail) {
  return local.post(`/qna/${answer.qNo}`, JSON.stringify(answer)).then(success).catch(fail);
}

function modifyAnswer(answer, success, fail) {
  local
    .put(`/qna/${answer.questionId}/${answer.answerId}`, JSON.stringify(answer))
    .then(success)
    .catch(fail);
}

function deleteAnswer(answer, success, fail) {
  local.delete(`/qna/${answer.questionId}/${answer.answerId}`).then(success).catch(fail);
}

export { selectAnswer, registAnswer, modifyAnswer, deleteAnswer };
