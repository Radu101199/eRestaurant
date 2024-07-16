const form = document.querySelector("form");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const locationInput = document.querySelector("#location");
const phoneInput = document.querySelector("#phone");
const editBtn = document.querySelector(".edit-button");
const saveBtn = document.querySelector(".save-button");
const formFields = document.querySelectorAll(
  "#profile-form input, #profile-form textarea, #profile-form select"
);
const params = new URLSearchParams(window.location.search);
const username = params.get("username");
const id = params.get("id");
const token = params.get("token");
const user = JSON.parse(localStorage.getItem(username));
const users = JSON.parse(localStorage.getItem("users")) || [];
const logoutButton = document.querySelector(".logout-button");

//seteaza casetele cu datele utilizatorului
document.getElementById("username").value = user.username;
document.getElementById("email").value = user.email;
document.getElementById("location").value = user.location;
document.getElementById("phone").value = user.phone;

editBtn.addEventListener("click", () => {
  formFields.forEach((field) => {
    if (field.id !== "username") {
      field.removeAttribute("disabled");
    }
  });
  editBtn.setAttribute("disabled", true);
});

saveBtn.addEventListener("click", () => {
  const userIndex = users.findIndex((user) => user.username === username);
  console.log(userIndex);
  const olduser = users[userIndex];

  olduser.email = document.getElementById("email").value;
  olduser.location = document.getElementById("location").value;
  olduser.phone = document.getElementById("phone").value;

  users[userIndex] = olduser;

  localStorage.setItem(user.username, JSON.stringify(olduser));
  localStorage.setItem("users", JSON.stringify(users));

  window.location.href =
    "/Mainpage/mainpage.html?id=" + user.id + "&username=" + user.username;
});

document.querySelector("#profile-form").addEventListener("submit", (event) => {
  event.preventDefault();
  editBtn.removeAttribute("disabled");
  formFields.forEach((field) => {
    field.setAttribute("disabled", true);
  });
});

// log out sterge cookie ul isLoggedIn
logoutButton.addEventListener("click", function () {
  // Delete cookies
  document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
  // Clear session storage
  sessionStorage.removeItem("isLoggedIn");

  // Redirect to main page
  window.location.href = "/Mainpage/mainpage.html";
});


// fake api pentru a prelua datele 
// const url = 'https://reqres.in/api/users/'; // Adjust the API endpoint to fetch user profile details
// const userToken = 'your-user-token';
// const apiUrl = 'https://reqres.in/api/profile'; // Adjust the API endpoint to retrieve user data
// var xhr = new XMLHttpRequest();
// xhr.open("GET", "https://reqres.in/api/profile/3", true);
// xhr.onload = function(){
//   let userData = JSON.parse(xhr.responseText).data;
//   document.getElementById("username").value = userData.name;
// document.getElementById("email").value = userData.year;
// document.getElementById("location").value = userData.color;
// document.getElementById("phone").value = userData.pantone_value;
//     console.log(xhr.responseText);
// };
// xhr.send();