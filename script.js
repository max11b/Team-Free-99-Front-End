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
      <h5 class="card-title" id="final_dest">${currentArray[i].destination}</h5>
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

async function likeOrDislike(e) {
  // Check element
  if (e.target.getAttribute("btn_type") == "like") {
    const likedDestination = e.target.parentElement.children[2].innerText;
    const likedLocation = e.target.parentElement.children[3].innerText;

    // We need to call API. Async and await
    const recommendationURL = await fetch(`${baseUrl}/finalReview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        destination: likedDestination,
        location: likedLocation,
      }),
    });
    const data = await recommendationURL.json();
    //need to make json to string
    urlString = JSON.stringify(data)

    //needed this to get rid of the 'recommendation' string and the curly brackets
    urlString = urlString.substring(19, urlString.length - 2)

    likeToList(likedDestination, likedLocation, urlString);
    e.target.parentElement.parentElement.remove()

  }
  else if (e.target.getAttribute("btn_type") == "dislike") {
    e.target.parentElement.parentElement.remove()
  }
  resetForm();
}

function resetForm() {
  document.getElementById("destination").value = "";
  document.getElementById("location").value = "";
}

//checks if like or dislike button is clicked
// document
//   .getElementById("third_container")
//   .addEventListener("click", likeToList);

// this will grab the liked cards and into a list with travel advisor hyperlink
async function likeToList(destination, location, recommendationURL) {
  const card = document.createElement("ul");
  const liList = document.createElement("li");
  liList.innerText = `${destination}, ${location}, ${recommendationURL}`;
  liList.classList.add("display_createCards_list");

  card.appendChild(liList);
  document.getElementById("third_container").appendChild(card);
}
