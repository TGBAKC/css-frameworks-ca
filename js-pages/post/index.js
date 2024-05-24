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
 * Endpoint for posts.
 * @constant {string}
 */
export const API_POSTS = "/social/posts";

/**
 * Query parameters for fetching posts.
 * @constant {string}
 */
const action = "?_author=true&_reactions=true&_comments=true";

/**
 * Fetch posts from the following list.
 * @async
 * @function getPostsFromFollowing
 * @param {number} [limit=100] - The number of posts to fetch.
 * @param {number} [page=1] - The page number to fetch.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of posts.
 * @throws {Error} - Throws an error if the request fails or if there is no authorization token.
 */
export async function getPostsFromFollowing(limit = 100, page = 1) {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No authorization token found. Please log in.");
    }

    // Construct the URL for fetching posts from following
    const getPostURL = `${API_BASE}${API_POSTS}/following${action}&limit=${limit}&page=${page}`;

    // Fetch posts with authentication
    const response = await fetch(getPostURL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
    });

    // Check if response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    // Parse response JSON and return data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getting posts:", error); // Debug: Log errors
    throw new Error("Error getting posts: " + error.message);
  }
}

/**
 * Fetches posts from the following list and displays them on the page.
 * @async
 * @function displayPosts
 * @returns {Promise<void>}
 * @throws {Error} - Throws an error if there is an issue fetching or displaying posts.
 */
async function displayPosts() {
  try {
    const data = await getPostsFromFollowing();
    const postsDiv = document.getElementById("posts");

    if (!Array.isArray(data)) {
      throw new Error("Data is not an array");
    }

    // Assuming data is an array of posts
    data.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.innerHTML = `
                <h5 class="post-title">${post.title}</h5>
                <p class="post-content">${post.content}</p>
            `;
      postsDiv.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error fetching posts:", error); // Debug: Log errors
  }
}

// Call the function to fetch and display posts
displayPosts();

const logout = document.querySelectorAll('a[name="logout"]');
logout.forEach((link) => {
  link.addEventListener("click", async function (event) {
    event.preventDefault();
    window.location.href = "/";
    localStorage.removeItem("token");
    localStorage.removeItem("key");
  });
});
