export const IS_LOGIN = localStorage.getItem("access_token");
export const USER_INFO = JSON.parse(localStorage.getItem("userInfo"));
export const IS_ADMIN = USER_INFO?.auth
  ?.map((e) => e.authority)
  .includes("ROLE_ADMIN");

export const NEW_DATE_IN_ARRAY = new Date()
  .toISOString()
  .split("T")[0]
  .split("-")
  .map((e) => Number(e));
