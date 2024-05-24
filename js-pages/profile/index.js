/**
 * Retrieves the name and avatar from the user profile stored in the local storage.
 * @type {Object}
 * @property {string} name - The name of the user.
 * @property {Object} avatar - The avatar object containing the URL of the user's avatar.
 */
const { name, avatar } = JSON.parse(localStorage.getItem("profile"));

/**
 * Updates the profile name elements with the user's name.
 * @function updateProfileNameElements
 * @param {string} name - The name of the user.
 */
const updateProfileNameElements = (name) => {
    const profileNameElements = document.getElementsByName("profile-name");
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

// Update profile name elements with the user's name
updateProfileNameElements(name);

// Update profile image element with the URL of the user's avatar
updateProfileImageElement(avatar.url);
