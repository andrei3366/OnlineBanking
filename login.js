// Adaugă acest cod în login.js
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.onsubmit = function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const userData = localStorage.getItem(username);
    const user = userData ? JSON.parse(userData) : null;

    if (user && user.password === password) {
      localStorage.setItem("isAuthenticated", "true");
      // Redirecționăm utilizatorul către pagina principală
      window.location.href = "home.html";
    } else {
      alert("Nume de utilizator sau parolă incorectă!");
    }
  };
});
