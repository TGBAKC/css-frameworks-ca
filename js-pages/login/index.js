/**
 * API key for authorization.
 * @constant {string}
 */
export const API_KEY = "87761a6a-60ce-40bf-b9ea-86ea11d25a56";

/**
 * Base URL for the API.
 * @constant {string}
 */
export const API_BASE = "https://v2.api.noroff.dev";

/**
 * Endpoint for authentication.
 * @constant {string}
 */
export const API_AUTH = "/auth";

/**
 * Endpoint for user registration.
 * @constant {string}
 */
export const API_REGISTER = "/register";

/**
 * Endpoint for user login.
 * @constant {string}
 */
export const API_LOGIN = "/login";

/**
 * Endpoint for creating API key.
 * @constant {string}
 */
export const API_KEY_URL = "/create-api-key";

/**
 * Endpoint for posts.
 * @constant {string}
 */
export const API_POSTS = "/social/posts";

/**
 * Endpoint for profiles.
 * @constant {string}
 */
export const API_PROFILES = "/social/profiles";

/**
 * Event listener for login form submission.
 */
document.forms.login.addEventListener("submit", onAuth);

/**
 * Event listener for register form submission.
 */
document.forms.register.addEventListener("submit", onAuth);

/**
 * Handles the authentication (login/register) form submission.
 * @async
 * @function onAuth
 * @param {Event} event - The form submission event.
 */
async function onAuth(event) {
  event.preventDefault();

  if (event.submitter.dataset.auth === "login") {
    const email = event.target.email.value;
    const password = event.target.password.value;

    await login(email, password);
  } else {
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    await register(name, email, password);
    await login(email, password);
  }
}

/**
 * Logs in a user with the provided email and password.
 * @async
 * @function login
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @throws Will throw an error if the email or password is not provided or if the login request fails.
 */
async function login(email, password) {
  try {
    if (!email || !password) {
      throw new Error("Please fill in all fields.");
    }
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
    alert(error.message);
  }
}

/**
 * Retrieves an API key for the logged-in user.
 * @async
 * @function getApiKey
 * @param {string} token - The authorization token.
 * @throws Will throw an error if the token is not provided or if the request fails.
 */
async function getApiKey(token) {
  try {
    if (!token) {
      throw new Error("There is no token.");
    }
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
    alert(error.message);
  }
}

/**
 * Registers a new user with the provided name, email, and password.
 * @async
 * @function register
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @throws Will throw an error if the name, email, or password is not provided or if the registration request fails.
 */
async function register(name, email, password) {
  try {
    if (!name || !email || !password) {
      throw new Error("Please fill in all fields.");
    }
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
    alert(error.message);
  }
}

const logout = document.querySelectorAll('a[name="logout"]');
logout.forEach((link) => {
  link.addEventListener("click", async function (event) {
    event.preventDefault();
    window.location.href = "/";
    localStorage.removeItem("token");
    localStorage.removeItem("key");
  });
});
