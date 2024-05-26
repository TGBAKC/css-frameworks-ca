/**
 * API constants.
 * @constant {string}
 */
export const API_KEY = "87761a6a-60ce-40bf-b9ea-86ea11d25a56";
export const API_BASE = "https://v2.api.noroff.dev";
export const API_AUTH = "/auth";
export const API_REGISTER = "/register";
export const API_LOGIN = "/login";
export const API_KEY_URL = "/create-api-key";
export const API_POSTS = "/social/posts";
export const API_PROFILES = "/social/profiles";
export const API_SOCIAL_BASE = "/social";

// Get profile information from local storage
const { name, avatar } = JSON.parse(localStorage.getItem("profile"));

// Set profile name
document.getElementById("profile-name").innerHTML = name;

// Set profile avatar
const element = document.getElementById("profile-avatar");
element.src = avatar.url;

/**
 * Delete a post.
 * @async
 * @param {string} id - The ID of the post to delete.
 * @throws Will throw an error if the deletion fails.
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
 * Update a post's title.
 * @async
 * @param {string} postId - The ID of the post to update.
 * @param {string} updatedTitle - The new title for the post.
 * @throws Will throw an error if the update fails.
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
 * Fetch and display posts.
 * @async
 * @param {string} token - The authentication token.
 * @param {string} key - The API key.
 * @param {string} [sort="newest"] - The sorting order of the posts.
 * @throws Will throw an error if fetching the posts fails.
 */
const getPosts = async (token, key, sort = "newest") => {
  try {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    const url =
      `${API_BASE}${API_POSTS}/${id}?_author=true&_reactions=true&_comments=true&limit=100&page=1`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": key,
      },
    });
    const post = (await response.json()).data;
    let postItems = `
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
              ? `<p class="card-text"><img src="${post.media.url}" width="200" height="200"></p>`
              : ""
          }
        </div>
        <div class="card-footer bg-white px-0">
          <div class="row">
            <div class="col-md-auto" id="${post.id}">
              
              
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById("posts").innerHTML = postItems;

    const detailsLink = document.querySelectorAll('a[name="details-btn"]');
    detailsLink.forEach((link) => {
      link.addEventListener("click", async function (event) {
        event.preventDefault();
        window.location.href = "/site-pages/details/index.html";
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
          throw new Error("H5 element with name 'title' not found.");
        }
      });
    });
  } catch (error) {
    alert(error.message);
  }
};

/**
 * Search for posts.
 * @async
 * @param {string} searchTerm - The term to search for.
 * @param {number} [limit=100] - The number of results to return.
 * @param {number} [page=1] - The page number to return.
 * @throws Will throw an error if the search fails.
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
              <span class="vl ml-3"></span>
            </div>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    document.getElementsByName("posts")[0].innerHTML = postItems;
  } catch (error) {
    throw new Error("Error getting posts: " + error.message);
  }
}

// Handle search form submission
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

// Get token and key from local storage and fetch posts
const token = localStorage.getItem("token");
const key = localStorage.getItem("key");
await getPosts(token, key);

// Handle logout
const logoutLink = document.getElementById("logout");
logoutLink.addEventListener("click", async function (event) {
  event.preventDefault();
  window.location.href = "/";
  localStorage.removeItem("token");
  localStorage.removeItem("key");
});
