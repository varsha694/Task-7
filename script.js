const userContainer = document.getElementById("userContainer");
const errorMsg = document.getElementById("errorMsg");
const reloadBtn = document.getElementById("reloadBtn");

async function fetchUsers() {
  userContainer.innerHTML = "Loading users...";
  errorMsg.textContent = "";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const users = await response.json();
    displayUsers(users);

  } catch (error) {
    errorMsg.textContent = "Failed to fetch data. Please check your connection.";
    console.error("Error:", error);
  }
}

function displayUsers(users) {
  userContainer.innerHTML = "";
  users.forEach(user => {
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");

    userCard.innerHTML = `
      <h3>${user.name}</h3>
      <p><b>Email:</b> ${user.email}</p>
      <p><b>Address:</b> ${user.address.street}, ${user.address.city}</p>
    `;

    userContainer.appendChild(userCard);
  });
}

reloadBtn.addEventListener("click", fetchUsers);

// Initial load
fetchUsers();
