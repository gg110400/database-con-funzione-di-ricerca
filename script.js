let userData = []; // Dichiarazione della variabile al di fuori del fetch

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Errore nella richiesta");
    }
    return response.json();
  })
  .then((data) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nella richiesta");
        }
        return response.json();
      })
      .then((data) => {
        // Assegna i dati ottenuti dalla richiesta alla variabile userData
        userData = data;
        data.forEach((dato) => {
          const userId = dato.id;
          const userName = dato.name;
          const username = dato.username;
          const email = dato.email;
          const phone = dato.phone;
          const address = dato.address;
          const website = dato.website;
          const company = dato.company;

          let tr = document.createElement("tr");
          tr.classList.add("table-row");
          tr.innerHTML = `
        <th scope="row">${userId}</th>
        <td colspan="2" class="user-name">${userName}</td>
        <td class="username">${username}</td>
        <td class="email">${email}</td>
        <td>${phone}</td>
        <td>${address.city}, ${address.street}, ${address.suite}, ${address.zipcode}</td>
        <td>${company.name}</td>
        <td>${website}</td>
        `;

          document.getElementById("tb").appendChild(tr);
        });
      })
      .catch((error) => {
        console.error("Si è verificato un errore:", error);
      });
  })
  .catch((error) => {
    console.error("Si è verificato un errore:", error);
  });

let searchInput = document.getElementById("search");
let selectMenu = document.getElementById("select");

selectMenu.addEventListener("change", function () {
  // Reset dell'input quando viene cambiata la selezione del dropdown
  searchInput.value = "";
});


searchInput.addEventListener("input", function () {
  const emails = document.querySelectorAll(".email");
  const names = document.querySelectorAll(".user-name");
  const usernames = document.querySelectorAll(".username");
  const searchTerm = this.value.toLowerCase();
  const tableRows = document.querySelectorAll(".table-row");
  const choice = selectMenu.value.toLowerCase();

  tableRows.forEach((tableRow) => {
    // Converti il testo della riga in minuscolo per confrontarlo con il termine di ricerca
    const rowData = tableRow.textContent.toLowerCase();
    if (choice === "username") {
      usernames.forEach((username) => {
        if ((username.textContent.toLowerCase().includes(searchTerm)) || (rowData.includes(searchTerm))) {
          tableRow.classList.remove("d-none");
        } else {
          tableRow.classList.add("d-none");
        }
      });
    } else if (choice === "email") {
      emails.forEach((email) => {
        if ((email.textContent.toLowerCase().includes(searchTerm)) || (rowData.includes(searchTerm))) {
          tableRow.classList.remove("d-none");
        } else {
          tableRow.classList.add("d-none");
        }
      });
    } else if (choice === "name") {
      names.forEach((name) => {
        if ((name.textContent.toLowerCase().includes(searchTerm)) || (rowData.includes(searchTerm))) {
          tableRow.classList.remove("d-none");
        } else {
          tableRow.classList.add("d-none");
        }
      });
    }
  });
});



