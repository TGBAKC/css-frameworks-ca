export const saveSessionInfo = (token, profile) => {
  localStorage.setItem("token", token);
  localStorage.setItem("profile", profile);
};

export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("profile");
};

export const getLocal = (param) => {
  localStorage.getItem(param);
};

export const setLocal = (key, value) => {
  localStorage.setItem(key, value);
};
