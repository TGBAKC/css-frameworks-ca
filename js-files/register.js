import fetch from "node-fetch";
import { login } from "./login";
export async function register(name, email, password) {
  if (!name || !email || !password) {
    throw new Error("Please fill in all fields.");
  }
  try {
    const url = API_BASE + API_AUTH + API_REGISTER;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    if (response.ok) {
      login(email, password);
      return;
    }
    throw new Error("Could not register the account");
  } catch (error) {
    console.log("error", error);
  }
}
