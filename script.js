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
    resetForm()
}

//gets the locaiton array from out API. initially none.
async function getLocation() {

    let locationArray = []

    let response = await fetch(`${baseUrl}/display20pictures`)
    let pictures = await response.json()
    locationArray = pictures
    return locationArray
}

//create html element cards for the photo
async function createCards() {

    let currentArray = await getLocation()
    console.log(currentArray)
    //resets the container
    document.getElementById("second_container").innerHTML = ""

    const card = document.createElement("div");
    const uList = document.createElement("ul");
    uList.classList.add("display-flex-row");

    for (let i = 0; i < currentArray.length; i++) {
        const pictureList = document.createElement("li");
        pictureList.innerHTML = `
    <div class="card">
    <h1 class="card-title">Destinations</h1>
    <img class="card-img-top" src=${currentArray[i].picture}>
      <h5 class="card-title">${currentArray[i].destination}</h5>
      <p class="card-text">${currentArray[i].location}</p>
      <a href="#" btn_type="like" class="btn btn_bright" uniqueID="${currentArray[i]._id}">Like</a>
      <a href="#" btn_type="dislike" class="btn btn-danger" uniqueID="diskile-btn-${currentArray[i]._id}">Dislike</a>
    </div>
  `;
        uList.appendChild(pictureList);
    }
    card.appendChild(uList);
    document.getElementById("second_container").appendChild(card);
}

document.getElementById("done").addEventListener("click", displayPictures);

//this will load all the photos submitted by the user
async function displayPictures(e) {
    e.preventDefault();

    console.log("submitted")
    await getLocation()
    createCards()
}

//checks if like or dislike button is clicked
document.getElementById("second_container").addEventListener("click", likeOrDislike)

function likeOrDislike(e) {
    const element = e.target
    if (Element.getAttributes("btn_type") == "like") {
        console.log("like")
        document.getElementById(third_contaier).appendChild(e.parentElement.parentElement)
    }
}

function resetForm() {
    document.getElementById("destination").value = "";
    document.getElementById("location").value = "";
}

function deleteCard(btn) {
    btn.parentElement.parentElement.remove();
}


