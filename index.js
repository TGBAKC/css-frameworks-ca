import fetch from "node-fetch";

export const API_KEY = "87761a6a-60ce-40bf-b9ea-86ea11d25a56";
export const API_BASE = "https://v2.api.noroff.dev";
export const API_AUTH = "/auth";
export const API_REGISTER = "/register";
export const API_LOGIN = "/login";
export const API_KEY_URL = "/create-api-key";
export const API_POSTS = "/social/posts";
export const API_PROFILES = "/social/profiles";

async function register(name, email, password) {
  console.log("register", { name, email, password });
  try {
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    const url = API_BASE + API_AUTH + API_REGISTER;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    console.log("response register", response);
    if (response.ok) {
      login(email, password);
      return;
    }
    throw new Error("Could not register the account");
  } catch (error) {
    console.log("error", error);
  }
}

async function login(email, password) {
  console.log("login", { email, password });
  try {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    const url = API_BASE + API_AUTH + API_LOGIN;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    console.log("response login", response);
    if (response.ok) {
      console.log("response.ok");
      const { accessToken: token, ...profile } = (await response.json()).data;
      getApiKey(token);
      console.log("accessToken", token);
      console.log("profile", profile);
      // saveSessionInfo(token, profile);
    }
  } catch (error) {
    console.log("error", error);
  }
}

async function getApiKey(token) {
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
    const { name, status, key } = (await response.json()).data;
    console.log("key", key);
    getPosts(token, key);
  } catch (error) {
    console.log("error", error);
  }
}

async function getPosts(token, api_key) {
  try {
    const url = API_BASE + API_POSTS;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": api_key,
      },
    });
    const data = (await response.json()).data;
    console.log("data", data);
  } catch (error) {
    console.log("error", error);
  }
}

const name = "tugbaaab123456789";
const email = "tugbaaab123456789@noroff.no";
const password = "tugbaaab123456789";

// register(name, email, password);

login(email, password);

const saveSessionInfo = (token, profile) => {
  localStorage.setItem("token", token);
  localStorage.setItem("profile", profile);
};



