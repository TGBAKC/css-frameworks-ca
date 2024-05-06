import { API_BASE,API_KEY } from "../constants.js";
import { load } from "../storage/load.js";



export async function getPosts(){
    const response = await fetch(API_BASE + "/sosial/posts",{
        headers: {
        Authorization:`Bearer ${load("token")}`,
        "X-Noroff-API-KEY": API_KEY
        }
    });
return await response.json();
}