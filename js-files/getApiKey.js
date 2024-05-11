
import { getPosts } from "./getPosts.js";
export async function getApiKey(token) {
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
    getPosts(token, key);
  } catch (error) {
    console.log("error", error);
  }
}
