import fetch from "node-fetch";

export async function getPost(id) {
  const url = `${API_BASE}${API_POSTS}/${id}`;

  const post = await fetch(url, {
    headers: {
      Authorization: `Bearer ${load("token")}`,
      "X-Noroff-API-Key": API_KEY,
    },
  });

  return post;
}
