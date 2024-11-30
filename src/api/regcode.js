import { regcodeAxios } from "@/util/http-commons";

const local = regcodeAxios();

function getRegcodeRequest(param, success, fail) {
  return local
    .get("/regcodes", {
      params: { regcode_pattern: param, is_ignore_zero: true },
    })
    .then(success)
    .catch(fail);
}

export { getRegcodeRequest };
