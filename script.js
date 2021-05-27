document.getElementById("myBtn").addEventListener("click", submitPhotos);

const baseUrl = `https://project-free99.herokuapp.com`;

//this will add data to our database to be loaded later
async function submitPhotos(e) {
  e.preventDefault();

  const userInputDestination = document.getElementById("destination").value;
  const userInputLocation = document.getElementById("location").value;

  const response = await fetch(`${baseUrl}/putPictures`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      destination: userInputDestination,
      location: userInputLocation,
    }),
  });
  const data = await response.json();
  resetForm();
}

//gets the locaiton array from out API. initially none.
async function getLocation() {
  let locationArray = [];

  let response = await fetch(`${baseUrl}/getPictures`);
  let pictures = await response.json();
  console.log("getLocation(): pictures: " + pictures);
  locationArray = pictures;
  return locationArray;
}

// Post Like Pictures
async function postLikePictures() {
  let picturesArray = [];

  let response = await fetch(`${baseUrl}/likePictures`);
  let pictures = await response.json();
  picturesArray = pictures;

  // Return
  return picturesArray;
}

//create html element cards for the photo
async function createCards() {
  //
  let currentArray = await getLocation();
  console.log("createCards(): currentArray: ");
  console.log(currentArray);
  console.log(currentArray[2].destination);

  //resets the container
  document.getElementById("second_container").innerHTML = "";

  const card = document.createElement("div");
  const uList = document.createElement("ul");
  uList.classList.add("display-flex-row");

  for (let i = 0; i < currentArray.length; i++) {
    const pictureList = document.createElement("li");
    pictureList.innerHTML = `
    <div class="card">
    <h4 class="card-title">Destinations</h4>
    <img class="card-img-top" src=${currentArray[i].picture}>
      <h5 class="card-title" id="turd_dest">${currentArray[i].destination}</h5>
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

  console.log("submitted");
  //   await getLocation();
  createCards();
}

//checks if like or dislike button is clicked
document
  .getElementById("second_container")
  .addEventListener("click", likeOrDislike);

function getID() {
  console.log(this._id);
  return this._id;
}

async function likeOrDislike(e) {
  // document
  console.log("likeOrDislike(e): document: " + document);

  // e
  console.log("likeOrDislike(e): e: " + e);

  // Print values of element
  const element = e.target;
  console.log("likeOrDislike(e): element: " + element);

  // Check element
  if (element.getAttribute("btn_type") == "like") {
    // likedPicture
    // const likedPicture = element.parentElement.parentElement;
    let currentArray = await getLocation();
    console.log("likeOrDislike(e): currentArray: ");
    console.log(currentArray);
    console.log(currentArray[2].destination);
    const likedPicture = element.parentElement.parentElement;
    console.log("likeOrDislike(e): likedPicture: " + likedPicture);

    likeToList(likedPicture);
  } else if (element.getAttribute("btn_type") == "dislike") {
    console.log(
      'likeOrDislike(e): element.getAttribute("btn_type") == "dislike"'
    );
    //   const dislikedPicture = element.parentElement.parentElement;
    //   dislikedPicture.remove();
  }
}

function resetForm() {
  document.getElementById("destination").value = "";
  document.getElementById("location").value = "";
}

// this will grab the liked cards and into a list with travel advisor hyperlink
function likeToList(picture) {
  console.log("likeToList(picture): picture: " + picture.innerHTML);

  result = picture.innerHTML.toString().substring(229, 236);
  console.log("likeToList(picture): result: " + result);

  //resets the container
  document.getElementById("third_container").innerHTML = "";

  const card = document.createElement("div");
  const liList = document.createElement("li");
  liList.classList.add("display_createCards_list");

  for (let i = 0; i < 1; i++) {
    const cardList = document.createElement("li");

    // This displays the new list from createCards
    cardList.innerHTML =
      // <div class="collection with-header">
      // <li class="collection-header"><h1>Destinations List</h1></li>
      `<li class="collection-item"><div>${result}<i class="material-icons">send</i></div></li>
      </div>
    `;
    liList.appendChild(cardList);
  }
  card.appendChild(liList);
  document.getElementById("third_container").appendChild(card);
}
