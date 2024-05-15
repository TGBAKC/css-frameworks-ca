export const API_KEY = "87761a6a-60ce-40bf-b9ea-86ea11d25a56";
export const API_BASE = "https://v2.api.noroff.dev";
export const API_AUTH = "/auth";
export const API_REGISTER = "/register";
export const API_LOGIN = "/login";
export const API_KEY_URL = "/create-api-key";
export const API_POSTS = "/social/posts";
export const API_PROFILES = "/social/profiles";

const { name, avatar } = JSON.parse(localStorage.getItem("profile"));

const elements = document.getElementsByName("profile-name");

elements.forEach((element) => {
  element.innerHTML = name;
});

const elements2 = document.getElementsByName("profile-avatar");

elements2.forEach((element) => {
  element.src = avatar.url;
});

async function getPosts(token, key) {
  try {
    const url = API_BASE + API_POSTS;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": key,
      },
    });
    const data = (await response.json()).data;
    console.log("data", data);
    var postItems = "";
    data.forEach((post) => {
      postItems += `
        <div class="card mb-3 m-5">
                                      <div class="card-body">
                                        <h5 class="card-title"> ${post.title}</h5>
                                        <p class="card-text">Discover how small changes in your daily life can lead to significant environmental benefits. From reducing waste to conserving energy, learn how to make your lifestyle more sustainable. Join the movement towards a greener planet. 🌍♻️</p>
                                      </div>
                                      <div class="card-footer bg-white px-0 ">
                                        <div class="row">
                          
                                            <div class=" col-md-auto ">
                                                <a href="#" class="btn btn-outlined btn-black text-muted bg-transparent" data-wow-delay="0.7s"><img src="https://img.icons8.com/ios/50/000000/settings.png" width="19" height="19" alt="icons"> <small>SETTINGS</small></a>
                          
                                                <i class="mdi mdi-settings-outline"></i>
                          
                          
                          
                          
                                                <a href="#" class="btn-outlined btn-black text-muted">
                                                    <img src="https://img.icons8.com/metro/26/000000/link.png" width="17" height="17" class="plus-icon" alt="icons">
                                                    <small>PROGRAM LINK</small>
                                                  </a>
                                                  
                          
                                                <a href="#" class="btn btn-outlined btn-black text-muted "><img src="https://img.icons8.com/metro/26/000000/more.png" width="20" height="20" class="mr-2 more" alt="icons"><small>MORE</small></a>
                                                <span class="vl ml-3"></span>
                                            </div>
                          
                                            <div class="col-md-auto ">
                                                <ul class="list-inline">
                                                    <li class="list-inline-item">
                                                      <img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1573035860/Pra/Hadie-profile-pic-circle-1.png" alt="DP" class="rounded-circle img-fluid" width="35" height="35">
                                                    </li>
                                                    <li class="list-inline-item">
                                                      <img src="https://img.icons8.com/ios/50/000000/plus.png" width="30" height="30" class="more" alt="icons">
                                                    </li>
                                                  </ul>
                                                  
                                            </div>
                                        </div>
                                    </div>
                                    </div>
        `;
      document.getElementsByName("posts")[0].innerHTML = postItems;
    });
  } catch (error) {
    console.log("error", error);
  }
}

const token = localStorage.getItem("token");
const key = localStorage.getItem("key");
getPosts(token, key);
