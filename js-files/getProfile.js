import fetch from "node-fetch";

export async function getProfileByName(name, token) {
  if (!name) {
    throw new Error("Please fill in all fields.");
  }
  try {
    const url = `${API_BASE}${API_PROFILES}/${id}`;
    const user = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
    });
    console.log(user);
    return user;
  } catch (error) {
    console.log("error", error);
  }
}
