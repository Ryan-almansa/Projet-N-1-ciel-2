const API_URL = "http://172.29.19.24:20001/api";

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) throw new Error(`Erreur serveur ${response.status}`);
    const data = await response.json();

    if (data.success) {
      window.location.href = "home.html";
    } else {
      document.getElementById("error").innerText = data.message;
    }
  } catch (err) {
    document.getElementById("error").innerText = "Serveur injoignable ou erreur interne";
    console.error(err);
  }
}

async function register() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) throw new Error(`Erreur serveur ${response.status}`);
    const data = await response.json();

    document.getElementById("message").innerText = data.message;
    if (data.success) {
      setTimeout(() => (window.location.href = "index.html"), 1500);
    }
  } catch (err) {
    document.getElementById("message").innerText = "Serveur injoignable ou erreur interne";
    console.error(err);
  }
}
