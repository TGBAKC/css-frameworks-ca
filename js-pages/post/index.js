// Define API constants
export const API_KEY = "87761a6a-60ce-40bf-b9ea-86ea11d25a56";
export const API_BASE = "https://v2.api.noroff.dev";
export const API_POSTS = "/social/posts";
const action = "?_author=true&_reactions=true&_comments=true";

// Function to fetch posts from following
export async function getPostsFromFollowing(limit = 100, page = 1) {
    try {
        // Construct the URL for fetching posts from following
        const getPostURL = `${API_BASE}${API_POSTS}/following${action}&limit=${limit}&page=${page}`;

        // Fetch posts with authentication
        const response = await fetch(getPostURL, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "X-Noroff-API-Key": API_KEY
            }
        });

        // Check if response is successful
        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }

        // Parse response JSON and return data
        return await response.json();
    } catch (error) {
        throw new Error("Error getting posts: " + error.message);
    }
}

// Call the function to fetch posts
getPostsFromFollowing()
    .then(data => {
        // Assuming data is an array of posts, update the post content on your dedicated post page
        // Example:
        document.getElementById('postTitle').textContent = data[0].title;
        document.getElementById('postContent').textContent = data[0].content;
    })
    .catch(error => {
        console.error('Error fetching posts:', error);
    });
    getPostsFromFollowing()
    .then(data => {
        const postsDiv = document.getElementById('posts');

        // Assuming data is an array of posts
        data.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `
                <h5 class="post-title">${post.title}</h5>
                <p class="post-content">${post.content}</p>
            `;
            postsDiv.appendChild(postElement);
        });
    })
    .catch(error => {
        console.error('Error fetching posts:', error);
    });
