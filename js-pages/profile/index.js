const { name } = JSON.parse(localStorage.getItem("profile"));

const elements = document.getElementsByName("profile-name");

elements.forEach((element) => {
  element.innerHTML = name;
});
