import { getCurrentUser } from "@api/auth.service";

function authHeader() {
  const user = getCurrentUser();

  if (user && user.token) {
    return { Authorization: `${user.type} ${user.token}` };
  } else return {};
}

export { authHeader };
