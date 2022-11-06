export const getCurrentUserSession = () => {
  return JSON.parse(localStorage.getItem("userInfo"));
};
