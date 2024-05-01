import {load} from "../api/storage/load.js"

export function headers(hasBody = false){
    c
return{
    headers:{
        Authorization: `Bearer ${load("token")}`,
        "X-Noroff-Api-Key": API_KEY
    }
}


}