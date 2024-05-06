import { login } from "../../auth/login.js";
import { register } from "../../auth/register.js";

export async function onAuth(event){
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    
    console.log("log", event.submitter.dataset.auth );
    
    if(event.submitter.dataset.auth === "login"){
      await login(email,password)  ;
    } else {
        await register(name,email,password);
        await login(email,password);
    }
    const posts = await getPosts();
    console.log(posts);
    
    }