import { logout } from "../redux/user";

export function setLogoutTimer(dispatch, expirationTime) {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime);
}
