
import { API_AUTH,API_BASE,API_REGISTER } from "../constants.js";


export async function register(name,email,password){
  console.log({name,email,password})
  console.log(API_BASE + API_AUTH + API_REGISTER)
    const response = await fetch(API_BASE + API_AUTH + API_REGISTER,{
      headers: {
        "Content-Type": "application/json"
      } , 
      method: "POST",
      body: JSON.stringify({name,email,password})
    });
    console.log(response)
    if (response.ok){
        return await response.json();
    }

    throw new Error("Could not register the account");
}