import { localAxios } from "@/util/http-commons";

const local = localAxios();

function registQna(param, success, fail) {
  return local.post(`/qna`, param).then(success).catch(fail);
}

function listQnaById(userId, success, fail) {
  return local.get(`/qna/user/${userId}`).then(success).catch(fail);
}

function getQna(qId, success, fail) {
  return local.get(`/qna/${qId}`).then(success).catch(fail);
}

function updateQna(question, success, fail) {
  return local
    .put(`/qna/${question.questionId}`, JSON.stringify(question))
    .then(success)
    .catch(fail);
}

function deleteQna(qNo, success, fail) {
  return local.delete(`/qna/${qNo}`).then(success).catch(fail);
}

export { registQna, listQnaById, getQna, updateQna, deleteQna };
