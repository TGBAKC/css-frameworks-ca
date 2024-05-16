
import { getApiKey } from "./getApiKey.js";
export async function login(email, password) {
  if (!email || !password) {
    throw new Error("Please fill in all fields.");
  }
  try {
    const url = API_BASE + API_AUTH + API_LOGIN;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const { accessToken: token, ...profile } = (await response.json()).data;
      getApiKey(token);
      return;
    }
    throw new Error("Could not login the account");
  } catch (error) {
    console.log("error", error);
  }
}
