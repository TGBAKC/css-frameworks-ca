// import { onAuth } from "../onAuth";

import { login } from "../../../auth/login.js";
import { register } from "../../../auth/register.js";

export function setAuthlistener(){
    console.log("setAuthlistener")
    document.forms.auth.addEventListener("submit", onAuth);
}

export async function onAuth(event){
    console.log("onAuth");
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    
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
