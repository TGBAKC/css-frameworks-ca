export function router() {
  switch (location.pathname) {
    case "/register/":
      return import("../pages/register.mjs");
    case "/":
      return import("../pages/login.mjs");
    default:
      return import("../pages/404.mjs");
  }
}
