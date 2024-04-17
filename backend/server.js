const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Permite serverului să parseze JSON

app.get("/", (req, res) => {
  res.send("Serverul este funcțional!");
});

app.listen(PORT, () => {
  console.log(`Serverul rulează pe portul ${PORT}`);
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send("Numele de utilizator și parola sunt necesare.");
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Salvează utilizatorul în baza de date
    // TODO: adaugă codul pentru salvarea în baza de date aici

    res.status(201).send("Utilizator înregistrat cu succes!");
  } catch (error) {
    res.status(500).send("Eroare la înregistrare");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send("Numele de utilizator și parola sunt necesare.");
  }

  try {
    // TODO: adaugă codul pentru a verifica utilizatorul în baza de date aici
    // Dacă utilizatorul este găsit și parola se potrivește:
    // res.send('Autentificare reușită!');
    // Altfel:
    // res.status(400).send('Nume de utilizator sau parolă incorectă.');
  } catch (error) {
    res.status(500).send("Eroare la autentificare");
  }
});
const mysql = require("mysql2");

// Crează o conexiune către baza de date
const db = mysql.createConnection({
  host: "localhost", // sau adresa serverului de MySQL
  user: "root", // înlocuiește cu userul tău de MySQL
  password: "Solaris12#", // înlocuiește cu parola ta de MySQL
  database: "OnlineBanking", // înlocuiește cu numele bazei de date
});

// Conectează-te la baza de date MySQL
db.connect((err) => {
  if (err) {
    console.error("Eroare la conectarea la baza de date: " + err.stack);
    return;
  }
  console.log("Conectat cu succes la baza de date cu ID-ul " + db.threadId);
});

// Tratează evenimentele de eroare la conexiune
db.on("error", (err) => {
  console.error("Eroare la conexiunea la baza de date: " + err.message);
});

// Tratează evenimentul de închidere a conexiunii
db.on("end", () => {
  console.log("Conexiunea la baza de date a fost închisă");
});

// Middleware pentru a permite serverului să parseze cererile JSON
app.use(express.json());

// Endpoint pentru înregistrare
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Hash parola utilizatorului
  const hashedPassword = await bcrypt.hash(password, 10);

  // Interogare pentru a adăuga un nou utilizator în baza de date
  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(query, [username, hashedPassword], (err, results) => {
    if (err) {
      console.error("Eroare la înregistrare: " + err.stack);
      res.status(500).send("Eroare la înregistrare");
      return;
    }
    res.status(201).send("Utilizator înregistrat cu succes");
  });
});

// Alte endpoint-uri și codul serverului...

// Pornirea serverului
//const PORT = 3000; // sau orice alt port preferi
app.listen(PORT, () => {
  console.log(`Serverul rulează pe portul ${PORT}`);
});
