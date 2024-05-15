import fetch from "node-fetch";

export async function getPosts(token, api_key) {
  if (!token || !api_key) {
    throw new Error("Please fill in all fields.");
  }
  try {
    const url = API_BASE + API_POSTS;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": api_key,
      },
    });
    if (response.ok) {
      const data = (await response.json()).data;
      console.log("data", data);
      return;
    }
    throw new Error("Could not get posts");
  } catch (error) {
    console.log("error", error);
  }
}
