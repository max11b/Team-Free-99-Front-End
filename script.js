document.getElementById("myBtn").addEventListener("click", submitPhotos);

function reloadPictures() {
    e.preventDefault();

    fetch(`${baseUrl}/display20pictures`)
        .then((response) => response.json())
        .then((pictures) => { });
}

const baseUrl = `https://project-free99.herokuapp.com`;

//this will display 20 pictures based on the user input
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

//loop through the database and display a picture
function displayPictures(e) {
    e.preventDefault();

    fetch(`${baseUrl}/display20pictures`)
        .then((response) => response.json())
        .then((pictures) => {
            console.log(pictures);
            //displaying all the pictures
            const card = document.createElement("div");
            const uList = document.createElement("ul");
            uList.classList.add("display-flex-row")

            for (let i = 0; i < pictures.length; i++) {
                const List = document.createElement("li");
                List.innerHTML = `
            <div class="card">
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


//make a function that keep traks of the like and dislikes. all the like photos should be added to the firstReviewLikes collection
function likeDislikeTracker() {

}

document.getElementById("Like").addEventListener("click", zeroToFivePics);
//make a function that puts 0-5 photos in the third page, and should be added to the secondReviewLikes collection
function zeroToFivePics() {
    document.create
}

//this is where we call initial POST from our backend
async function addInitialCards(e) {
    //keep it from refreshing
    e.preventDefault();

    const userDestinationInput = document.getElementById("destination").value;
    const userLocationInput = document.getElementById("location").value;

    const response = await fetch(`${baseUrl}/firstReview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            destination: userDestinationInput,
            location: userLocationInput,
        }),
    });
    await response.json();
    location.reload();
}

function handleSubmit(e) {
    e.preventDefault();

    const userDestinationInput = document.getElementById("destination").value;
    const userLocationInput = document.getElementById("location").value;

    //fetches backend api
    fetch(url)
        .then((response) => response.json())
        .then((pictures) => addPictures(pictures.results));
}

function addPictures(pictures) {
    const random = Math.floor(Math.random() * pictures.length);
    const photoURL = pictures[random].urls.thumb;

    const userDestinationInput = document.getElementById("destination").value;
    const userLocationInput = document.getElementById("location").value;

    document.createElement("div").classList.add("card");

    document.createElement("div").innerHTML = `
    <div class="card-body">
    <img class="card-img-top" src =${photoURL}>
        <h5 class="card-title">${userDestinationInput}</h5>
        <p class="card-text">${userLocationInput}</p>
    </div>`;
}

function resetForm() {
    document.getElementById("destination").value = "";
    document.getElementById("location").value = "";
    document.getElementById("photo").value = "";
}

function deleteCard(btn) {
    btn.parentElement.parentElement.remove();
}

function handleEdit(e) {
    const oldDestination = e.parentElement.children[0];
    const oldLocation = e.parentElement.children[1];

    const oldPhoto = e.parentElement.parentElement.children[0];

    const newDestination = prompt("New Destination", oldDestination.innerText);
    const newLocation = prompt("New Location", oldLocation.innerText);
    const newPhoto = promt("New Photo", oldPhoto.getAttribute("src"));

    if (newDestination !== "") {
        oldLocation.innerText = newDestination;
    }

    if (newLocation !== "") {
        oldLocation.innerText = newLocation;
    }

    if (newPhoto !== "") {
        oldPhoto.setAttribute("src", newPhoto);
    }
}
