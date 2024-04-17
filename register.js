document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");

  registerForm.onsubmit = function (event) {
    event.preventDefault();

    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Parolele nu se potrivesc!");
      return;
    }

    // Aici ar trebui să adaugi validarea datelor de înregistrare
    // și să te asiguri că numele de utilizator nu este deja luat.

    // Pentru exemplu, vom verifica doar dacă numele de utilizator există deja
    if (localStorage.getItem(username)) {
      alert("Numele de utilizator este deja luat. Alege altul.");
      return;
    }

    // Stocăm utilizatorul în localStorage
    localStorage.setItem(
      username,
      JSON.stringify({ username: username, password: password })
    );

    alert("Cont creat cu succes! Te rugăm să te loghezi.");
    window.location.href = "login.html";
  };
});
