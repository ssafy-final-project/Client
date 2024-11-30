import { jwtAuthenticate } from '@/api/jwt';
import { useUserStore } from '@/stores/user';

export async function axiosJwtAuth() {
  let authRes = false;
  const userStore = useUserStore();
  await jwtAuthenticate(
    ({ data }) => {
      console.log('jwt Auth good ' + data.uid);
      authRes = true;
      userStore.loginUser(data.uid);
    },
    (data) => {
      console.log('jwt Auth bad ' + data);
      userStore.logoutUser();
    }
  );
  return authRes;
}
