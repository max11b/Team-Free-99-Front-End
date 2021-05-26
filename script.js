document.getElementById("myBtn").addEventListener("click", submitPhotos);

const baseUrl = `https://project-free99.herokuapp.com`;

//this will add data to our database to be loaded later
async function submitPhotos(e) {
  e.preventDefault();

  const userInputDestination = document.getElementById("destination").value;
  const userInputLocation = document.getElementById("location").value;

  const response = await fetch(`${baseUrl}/put20pictures`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      destination: userInputDestination,
      location: userInputLocation,
    }),
  });
  const data = await response.json();
}

document.getElementById("done").addEventListener("click", displayPictures);

//this will load all the photos submitted by the user
function displayPictures(e) {
  e.preventDefault();

  fetch(`${baseUrl}/display20pictures`)
    .then((response) => response.json())
    .then((pictures) => {
      console.log(pictures);
      //displaying all the pictures
      const card = document.createElement("div");
      const uList = document.createElement("ul");
      uList.classList.add("display-flex-row");

      for (let i = 0; i < pictures.length; i++) {
        const List = document.createElement("li");
        List.innerHTML = `
            <div class="card">
            <h1 class="card-title">Destinations</h1>
            <img class="card-img-top" src=${pictures[i].picture}>
              <h5 class="card-title">${pictures[i].destination}</h5>
              <p class="card-text">${pictures[i].location}</p>
              <a href="#" btn_type="edit_btn" class="btn btn_bright" uniqueID="${pictures[i].id} ">Like</a>
      <a href="#" btn_type="delete_btn" class="btn btn-danger" uniqueID= "${pictures[i].id} ">Dislike</a>
            </div>
          `;
        uList.appendChild(List);
      }
      card.appendChild(uList);
      document.getElementById("second_container").appendChild(card);
    });
}


}

function resetForm() {
  document.getElementById("destination").value = "";
  document.getElementById("location").value = "";
  document.getElementById("photo").value = "";
}

function deleteCard(btn) {
  btn.parentElement.parentElement.remove();
}


