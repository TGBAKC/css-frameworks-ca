const { name, avatar } = JSON.parse(localStorage.getItem("profile"));

const profileNameElements = document.getElementsByName("profile-name");
profileNameElements.forEach((element) => {
  element.innerHTML = name;
});

const profileImageElement = document.getElementById("profile-image");
profileImageElement.src = avatar.url;
