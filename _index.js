/**
 * API key for accessing the Noroff API.
 * @type {string}
 */
export const API_KEY = "87761a6a-60ce-40bf-b9ea-86ea11d25a56";

/**
 * Base URL for the Noroff API.
 * @type {string}
 */
export const API_BASE_URL = "https://v2.api.noroff.dev";

/**
 * Path for authentication endpoints.
 * @type {string}
 */
export const API_AUTH = "/auth";

/**
 * Path for user registration endpoint.
 * @type {string}
 */
export const API_REGISTER = "/register";

/**
 * Path for user login endpoint.
 * @type {string}
 */
export const API_LOGIN = "/login";

/**
 * Path for creating an API key endpoint.
 * @type {string}
 */
export const API_KEY_URL = "/create-api-key";

/**
 * Path for retrieving social posts.
 * @type {string}
 */
export const API_POSTS = "/social/posts";

/**
 * Path for retrieving social profiles.
 * @type {string}
 */
export const API_PROFILES = "/social/profiles";

/**
 * Registers a new user.
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<void>}
 * @example
 * ```js
 * register("John Doe", "john.doe@example.com", "password123");
 * ```
 */
async function register(name, email, password) {
  console.log("register", { name, email, password });
  try {
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    const url = API_BASE_URL + API_AUTH + API_REGISTER;
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

/**
 * Logs in a user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<void>}
 * @example
 * ```js
 * login("john.doe@example.com", "password123");
 * ```
 */
async function login(email, password) {
  console.log("login", { email, password });
  try {
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    const url = API_BASE_URL + API_AUTH + API_LOGIN;
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

/**
 * Retrieves an API key for the user.
 * @param {string} token - The access token of the user.
 * @returns {Promise<void>}
 * @example
 * ```js
 * getApiKey("your-access-token");
 * ```
 */
async function getApiKey(token) {
  try {
    const url = API_BASE_URL + API_AUTH + API_KEY_URL;
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

/**
 * Retrieves posts for the user.
 * @param {string} token - The access token of the user.
 * @param {string} api_key - The API key of the user.
 * @returns {Promise<void>}
 * @example
 * ```js
 * getPosts("your-access-token", "your-api-key");
 * ```
 */
async function getPosts(token, api_key) {
  try {
    const url = API_BASE_URL + API_POSTS;
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

/**
 * Saves session information to local storage.
 * @param {string} token - The access token of the user.
 * @param {Object} profile - The profile information of the user.
 * @param {string} profile.name - The name of the user.
 * @param {string} profile.email - The email of the user.
 * @example
 * ```js
 * saveSessionInfo("your-access-token", { name: "John Doe", email: "john.doe@example.com" });
 * ```
 */
const saveSessionInfo = (token, profile) => {
  localStorage.setItem("token", token);
  localStorage.setItem("profile", JSON.stringify(profile));
};
