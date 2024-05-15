export const API_KEY = "87761a6a-60ce-40bf-b9ea-86ea11d25a56";
export const API_BASE = "https://v2.api.noroff.dev";
export const API_AUTH = "/auth";
export const API_REGISTER = "/register";
export const API_LOGIN = "/login";
export const API_KEY_URL = "/create-api-key";
export const API_POSTS = "/social/posts";
export const API_PROFILES = "/social/profiles";

document.forms.login.addEventListener("submit", onAuth);
document.forms.register.addEventListener("submit", onAuth);

async function onAuth(event) {
  event.preventDefault();

  console.log("log", event.submitter.dataset.auth);

  if (event.submitter.dataset.auth === "login") {
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log("email", email);
    console.log("password", password);

    await login(email, password);
  } else {
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log("name", name);
    console.log("email", email);
    console.log("password", password);

    await register(name, email, password);
    await login(email, password);
  }
}

async function login(email, password) {
  console.log("email", email);
  console.log("password", password);

  if (!email || !password) {
    throw new Error("Please fill in all fields.");
  }
  try {
    const url = API_BASE + API_AUTH + API_LOGIN;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const { accessToken: token, ...profile } = (await response.json()).data;
      localStorage.setItem("profile", JSON.stringify(profile));
      getApiKey(token);
      return;
    }
    throw new Error("Could not login the account");
  } catch (error) {
    console.log("error", error);
  }
}

async function getApiKey(token) {
  if (!token) {
    throw new Error("Please fill in all fields.");
  }
  try {
    const url = API_BASE + API_AUTH + API_KEY_URL;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({ name: "Test key" }),
    });
    const { key } = (await response.json()).data;
    localStorage.setItem("key", key);
    localStorage.setItem("token", token);
    window.location.href = "/site-pages/profile";
  } catch (error) {
    console.log("error", error);
  }
}

async function register(name, email, password) {
  if (!name || !email || !password) {
    throw new Error("Please fill in all fields.");
  }
  try {
    const url = API_BASE + API_AUTH + API_REGISTER;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    if (response.ok) {
      login(email, password);
      return;
    }
    throw new Error("Could not register the account");
  } catch (error) {
    console.log("error", error);
  }
}
