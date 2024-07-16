const rememberMeCheckboxChecked = document.getElementById("remember-me");
// functia logare verifica daca exista utilizatorul in local storage si seteaza un cookie care spune ca utilizatorul este logat
function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var user = JSON.parse(localStorage.getItem(username));

  if (user != null && user.password == password) {
    alert("Autentificare reușită!");
    sessionStorage.setItem("isLoggedIn", "true");
    console.log(rememberMeCheckboxChecked.checked);
    if (rememberMeCheckboxChecked.checked) {
      const userId = user.id.toString();
      const username = user.username.toString();
      setEncryptedCookie(userId, username);
    }
    window.location.href =
      "/Mainpage/mainpage.html?id=" + user.id + "&username=" + user.username;
  } else {
    alert("Nume de utilizator sau parolă incorectă!");
  }
}
function setEncryptedCookie(userId, username) {
  const secretKey = "aBcD1234!@#$";
  const encryptedUserId = encodeURIComponent(CryptoJS.AES.encrypt(userId, secretKey).toString());
  const encryptedUsername = encodeURIComponent(CryptoJS.AES.encrypt(username, secretKey).toString());
  console.log(encryptedUserId, encryptedUsername);
  document.cookie = `userId=${encryptedUserId}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=None; Secure`;
  document.cookie = `username=${encryptedUsername}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; SameSite=None; Secure`;
}
//functie inregistrare cu validatoare
function register() {

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }

  var username = document.getElementById("reg-username").value;
  var password = document.getElementById("reg-password").value;
  var email = document.getElementById("reg-email").value;
  var location = document.getElementById("reg-location").value;
  var phone = document.getElementById("reg-phone").value;

  if (localStorage.getItem(username)) {
    alert("Acest nume de utilizator există deja. Vă rugăm să alegeți altul.");
    return;
  }
  if (username.length < 6) {
    alert("Numele de utilizator trebuie sa contina cel putin 6 caractere");
    return;
  }

  if (password.length < 8) {
    alert("Parola trebuie sa contina cel putin 8 caractere");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Format email invalid!");
    return;
  }
  
  if (!isValidPhone(phone)) {
    alert("Numar de telefon invalid!");
    return;
  }

  var users = JSON.parse(localStorage.getItem("users")) || [];
  var userId = users.length + 1;

  var newUser = {
    id: userId,
    username: username,
    password: password,
    email: email,
    location: location,
    phone: phone,
  };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem(username, JSON.stringify(newUser));

  alert("Înregistrare reușită!");
  window.location.href = "/Login/login.html";
}

function dejaC () {
  window.location.href= "/Login/login.html";
}
function registerPage(){
  window.location.href= "/Register/register.html";
}
// Functie de logare folosind un api

// function login() {
//   var username = document.getElementById("username").value;
//   var password = document.getElementById("password").value;

//   var loginData = {
//     email: username,
//     password: password
//   };

//   fetch('https://reqres.in/api/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(loginData)
//   })
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error('Login failed');
//       }
//     })
//     .then(data => {
//       alert("Autentificare reușită!");

//       var token = data.token; // Access the token from the response data
//       console.log(data);
//       document.cookie =
//         "isLoggedIn=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
//       window.location.href =
//         "/Mainpage/mainpage.html;
//     })
//     .catch(error => {
//       alert("Nume de utilizator sau parolă incorectă!");
//       console.error('Error during login:', error);
//     });
// }
