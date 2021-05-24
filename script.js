// Use a function to call the backend server.
document.getElementById("free99").addEventListener("submit", addCards);



function handleSubmit(e) {
    e.preventDefault();

    const userDestinationInput = document.getElementById("destination").value;
    const userLocationInput = document.getElementById("location").value;

    let url = "" + userDestinationInput + "%20" + userLocationInput + "";

    fetch(url)
    .then((response) => response.json())
    .then((pictures) => addPictures(pictures.results));
}

function addPictures(pictures) {
    
    const random = Math.floor(Math.random()*pictures.length);
    const photoURL = pictures[random].urls.thumb;

    const userDestinationInput = document.getElementById("destination").value;
    const userLocationInput = document.getElementById("location").value;
    const userDescriptionInput = document.getElementById("description").value;

    document.createElement("div").classList.add("card");

    document.createElement("div").innerHTML = `
    <div class="card-body">
    <img class="card-img-top" src =${photoURL}>
        <h5 class="card-title">${userDestinationInput}</h5>
        <p class="card-text">${userLocationInput}</p>
        <p class="card-text">${userDescriptionInput}</P>
        <button class="btn btn-warning" btn-type="edit">Edit</button>
        <button class="btn btn-danger" btn-type="delete">Delete</button>
    </div>`;

}

function resetForm() {
    document.getElementById("destination").value = "";
    document.getElementById("location").value = "";
    document.getElementById("photo").value = "";
}

function handleClick(e) {
    if (e.target.getAttribute("btn-type") === "delete_btn") {
        deleteCar(e.target);
    } else if (e.target.getAttribute("btn-type") === "edit_btn") {
        handleEdit(e.target);
    }
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