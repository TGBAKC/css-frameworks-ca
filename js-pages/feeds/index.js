/**
 * API Key for Noroff API
 * @constant {string}
 */
export const API_KEY = "87761a6a-60ce-40bf-b9ea-86ea11d25a56";

/**
 * Base URL for Noroff API
 * @constant {string}
 */
export const API_BASE = "https://v2.api.noroff.dev";

/**
 * Auth endpoint
 * @constant {string}
 */
export const API_AUTH = "/auth";

/**
 * Register endpoint
 * @constant {string}
 */
export const API_REGISTER = "/register";

/**
 * Login endpoint
 * @constant {string}
 */
export const API_LOGIN = "/login";

/**
 * API Key creation URL
 * @constant {string}
 */
export const API_KEY_URL = "/create-api-key";

/**
 * Posts endpoint
 * @constant {string}
 */
export const API_POSTS = "/social/posts";

/**
 * Profiles endpoint
 * @constant {string}
 */
export const API_PROFILES = "/social/profiles";

/**
 * Social base endpoint
 * @constant {string}
 */
export const API_SOCIAL_BASE = "/social";

/**
 * User profile details from local storage
 * @constant {Object}
 */
const { name, avatar } = JSON.parse(localStorage.getItem("profile"));

/**
 * Set profile name
 */
document.getElementById("profile-name").innerHTML = name;

/**
 * Set profile avatar
 */
const element = document.getElementById("profile-avatar");
element.src = avatar.url;

/**
 * Add event listener for create post button
 */
document.getElementsByName("create-post")[0].addEventListener("click", (e) => {
  e.preventDefault();
  createPost();
});

/**
 * Add event listener for sorting posts by newest
 */
document.getElementById("sortNew").addEventListener("click", (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const key = localStorage.getItem("key");
  getPosts(token, key, "newest");
});

/**
 * Add event listener for sorting posts by oldest
 */
document.getElementById("sortOld").addEventListener("click", (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const key = localStorage.getItem("key");
  getPosts(token, key, "oldest");
});

/**
 * Create a new post
 * @async
 */
const createPost = async () => {
  const token = localStorage.getItem("token");
  const key = localStorage.getItem("key");
  const title = document.getElementsByName("post-title")[0].value;
  const body = document.getElementsByName("post-text")[0].value;
  const url = `${API_BASE}${API_SOCIAL_BASE}/posts`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
      }),
    });
    if (response.ok) {
      await getPosts(token, key);
    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    alert(error.message);
  }
};

/**
 * Delete a post by ID
 * @async
 * @param {string} id - Post ID
 */
const deletePost = async (id) => {
  const token = localStorage.getItem("token");
  const key = localStorage.getItem("key");
  try {
    const url = `${API_BASE}${API_SOCIAL_BASE}/posts/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": key,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      await getPosts(token, key);
    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    alert(error.message);
  }
};

/**
 * Update a post title
 * @async
 * @param {string} postId - Post ID
 * @param {string} updatedTitle - Updated title
 */
const updatePostItem = async (postId, updatedTitle) => {
  const token = localStorage.getItem("token");
  const key = localStorage.getItem("key");
  const url = `${API_BASE}${API_POSTS}/${postId}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: updatedTitle,
      }),
    });
    if (response.ok) {
      await getPosts(token, key);
    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    alert(error.message);
  }
};

/**
 * Get posts
 * @async
 * @param {string} token - Authentication token
 * @param {string} key - API key
 * @param {string} [sort="newest"] - Sorting method
 */
const getPosts = async (token, key, sort = "newest") => {
  try {
    const url = API_BASE + API_POSTS + "?_author=true";
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": key,
      },
    });
    const data = (await response.json()).data;
    let postItems = data
      .sort((a, b) => {
        if (sort == "newest") {
          return b.id - a.id;
        } else return a.id - b.id;
      })
      .map(
        (post) => `
      <div class="card mb-3 m-5" id="${post.id}">
        <div class="card-body">
        <img
          src="${post.author.avatar.url}"
          width="19"
          height="19"
          alt="icons"
        />
          <a href="#">
            <h5 class="card-title" contenteditable="true" name="title">${
              post.title
            }</h5>
          </a>
          <p class="card-text">
            ${post.body || ""}
          </p>
          ${
            post.media?.url
              ? `
              <div class="d-flex justify-content-center align-items-center">
                <img src="${post.media.url}" class="img-fluid" style="max-width: 100%; height: auto;">
              </div>
            ` 
              : ""
          }
        </div>
        <div class="card-footer bg-white px-0">
          <div class="row">
            <div class="col-md-auto" id="${post.id}">
              <a
                href="#"
                class="btn btn-outlined btn-black text-muted bg-transparent"
                data-wow-delay="0.7s"
                name="delete-btn"
              >
                <img
                  src="https://img.icons8.com/ios/50/000000/settings.png"
                  width="19"
                  height="19"
                  alt="icons"
                >
                <small>DELETE</small>
              </a>
              <a href="#" class="btn-outlined btn-black text-muted" name="update-btn">
                <img
                  src="https://img.icons8.com/metro/26/000000/link.png"
                  width="17"
                  height="17"
                  class="plus-icon"
                  alt="icons"
                >
                <small>UPDATE</small>
              </a>
              <a class="btn-outlined btn-black text-muted" name="details-btn">
                <img
                  src="https://img.icons8.com/metro/26/000000/link.png"
                  width="17"
                  height="17"
                  class="plus-icon"
                  alt="icons"
                >
                <small>Details</small>
              </a>
            </div>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    document.getElementById("posts").innerHTML = postItems;

    const detailsLink = document.querySelectorAll('a[name="details-btn"]');
    detailsLink.forEach((link) => {
      link.addEventListener("click", async function (event) {
        event.preventDefault();
        window.location.href =
          "/site-pages/details/index.html?id=" + this.parentElement.id;
      });
    });

    const deleteLinks = document.querySelectorAll('a[name="delete-btn"]');
    deleteLinks.forEach((link) => {
      link.addEventListener("click", async function (event) {
        event.preventDefault();

        const postId = this.parentElement.id;
        await deletePost(postId);
      });
    });

    const updatePost = document.querySelectorAll('a[name="update-btn"]');
    updatePost.forEach((link) => {
      link.addEventListener("click", async function (event) {
        event.preventDefault();

        const postId = this.parentElement.id;
        var titleElement = document.querySelector('h5[name="title"]');

        if (titleElement) {
          var titleText = titleElement.textContent;

          await updatePostItem(postId, titleText);
        } else {
          throw new Error('H5 element with name "title" not found.');
        }
      });
    });
  } catch (error) {
    alert(error.message);
  }
};

/**
 * Action string with query parameters
 * @constant {string}
 */
const action = "?_author=true&_reactions=true&_comments=true";

/**
 * Search for posts
 * @async
 * @param {string} searchTerm - Term to search for
 * @param {number} [limit=100] - Number of results to return
 * @param {number} [page=1] - Page number
 */
async function search(searchTerm, limit = 100, page = 1) {
  try {
    const url = `${API_BASE}${API_SOCIAL_BASE}/posts/search${action}&q=${searchTerm}&limit=${limit}&page=${page}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": key,
      },
    });
    const data = (await response.json()).data;
    let postItems = data
      .map(
        (post) => `
      <div class="card mb-3 m-5" id="${post.id}">
        <div class="card-body">
          <img
            src="${post.author.avatar.url}"
            width="19"
            height="19"
            alt="icons"
          >
          <a href="#">
            <h5 class="card-title" contenteditable="true" name="title">${post.title}</h5>
          </a>
          <p class="card-text">
            ${post.body}
          </p>
        </div>
        <div class="card-footer bg-white px-0">
          <div class="row">
            <div class="col-md-auto" id="${post.id}">
              <a
                href="#"
                class="btn btn-outlined btn-black text-muted bg-transparent"
                data-wow-delay="0.7s"
                name="delete-btn"
              >
                <img
                  src="https://img.icons8.com/ios/50/000000/settings.png"
                  width="19"
                  height="19"
                  alt="icons"
                >
                <small>DELETE</small>
              </a>
              <i class="mdi mdi-settings-outline"></i>
              <a href="#" class="btn-outlined btn-black text-muted " name="update-btn">
                <img
                  src="https://img.icons8.com/metro/26/000000/link.png"
                  width="17"
                  height="17"
                  class="plus-icon"
                  alt="icons"
                >
                <small>UPDATE</small>
              </a>
              <span class="vl ml-3"></span>
            </div>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    document.getElementById("posts").innerHTML = postItems;
  } catch (error) {
    throw new Error("Error getting posts: " + error.message);
  }
}

/**
 * Search form submit event listener
 */
var searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var searchInput = document.querySelector('input[name="search"]');

  if (searchInput) {
    var searchValue = searchInput.value;
    search(searchValue);
  } else {
    console.error('Input element with name "search" not found.');
  }
});

/**
 * Get initial posts on page load
 */
const token = localStorage.getItem("token");
const key = localStorage.getItem("key");
await getPosts(token, key);

/**
 * Logout functionality
 */
const logout = document.querySelectorAll('a#logout');
logout.forEach((link) => {
  link.addEventListener("click", async function (event) {
    event.preventDefault();
    window.location.href = "/";
    localStorage.removeItem("token");
    localStorage.removeItem("key");
  });
});
