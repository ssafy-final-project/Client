import { localAxios } from '@/util/http-commons';

const local = localAxios();

function getRoutes(dong_code, success, fail) {
  return local.get(`/route/${dong_code}`).then(success).catch(fail);
}

export { getRoutes };
