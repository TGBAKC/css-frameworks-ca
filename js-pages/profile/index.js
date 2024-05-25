export const API_KEY = "87761a6a-60ce-40bf-b9ea-86ea11d25a56";
export const API_BASE = "https://v2.api.noroff.dev";
export const API_AUTH = "/auth";
export const API_REGISTER = "/register";
export const API_LOGIN = "/login";
export const API_KEY_URL = "/create-api-key";
export const API_POSTS = "/social/posts";
export const API_PROFILES = "/social/profiles";
export const API_SOCIAL_BASE = "/social";

/**
 * Retrieves the name and avatar from the user profile stored in the local storage.
 * @type {Object}
 * @property {string} name - The name of the user.
 * @property {Object} avatar - The avatar object containing the URL of the user's avatar.
 */
const { name, avatar, email } = JSON.parse(localStorage.getItem("profile"));

/**
 * Updates the profile name elements with the user's name.
 * @function updateProfileNameElements
 * @param {string} name - The name of the user.
 */
const updateProfileNameElements = (name) => {
  const profileNameElements = document.querySelectorAll(".profile-name");
  profileNameElements.forEach((element) => {
    element.innerHTML = name;
  });
};

/**
 * Updates the profile image element with the URL of the user's avatar.
 * @function updateProfileImageElement
 * @param {string} imageUrl - The URL of the user's avatar image.
 */
const updateProfileImageElement = (imageUrl) => {
  const profileImageElement = document.getElementById("profile-image");
  profileImageElement.src = imageUrl;
};

/**
 * Updates the profile email elements with the user's email.
 * @function updateProfileEmailElements
 * @param {string} email - The email of the user.
 */
const updateProfileEmailElements = (email) => {
  const profileEmailElements = document.querySelectorAll(".profile-email");
  profileEmailElements.forEach((element) => {
    element.innerHTML = email;
  });
};

document.addEventListener("DOMContentLoaded", function() {
  const { name, avatar, email } = JSON.parse(localStorage.getItem("profile"));
  updateProfileNameElements(name);
  updateProfileImageElement(avatar.url);
  updateProfileEmailElements(email);
});
const logoutLinks = document.querySelectorAll('.logout-link');
logoutLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "/";
    localStorage.removeItem("token");
    localStorage.removeItem("key");
  });
});