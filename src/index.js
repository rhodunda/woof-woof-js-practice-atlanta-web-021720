const PUPS = "http://localhost:3000/pups";

function init() {
  fetchDogs();
  dogFilter();
}
function fetchDogs() {
  fetch("http://localhost:3000/pups")
    .then((resp) => resp.json())
    .then((resp) => renderDogs(resp));
}
init();

function renderDogs(resp) {
  let dogName = document.querySelector("#dog-bar");
  resp.forEach((dog) => {
    let dogSpan = document.createElement("span");
    dogSpan.innerText = dog.name;
    dogName.appendChild(dogSpan);
    dogEventListener(dog, dogSpan);
  });
}

function dogEventListener(dog, dogSpan) {
  dogSpan.addEventListener("click", function (e) {
    let dogInfoDiv = document.querySelector("#dog-info");
    dogInfoDiv.innerHTML = "";

    let dogImg = document.createElement("img");
    dogImg.src = dog.image;
    dogInfoDiv.appendChild(dogImg);

    let dogH2 = document.createElement("h2");
    dogH2.innerText = dog.name;
    dogInfoDiv.appendChild(dogH2);

    let dogButton = document.createElement("button");
    if (dog.isGoodDog) dogButton.innerText = "Good Dog!";
    else dogButton.innerText = "Bad Dog!";
    dogButton.className = "dogButton";
    dogInfoDiv.appendChild(dogButton);
    dogButton.addEventListener("click", function (e) {
      let dogButton = document.querySelector(".dogButton");

      if (e.target.innerText === "Good Dog!") {
        dogButton.innerText = "Bad Dog!";
      } else {
        dogButton.innerText = "Good Dog!";
      }
      toggleDog(e, dog);
    });
  });
}

function toggleDog(e, dog) {
  if (dog.isGoodDog === true) patchDogStatus(!dog.isGoodDog, dog.id);
  else patchDogStatus(!dog.isGoodDog, dog.id);
}

function patchDogStatus(dogStatus, dogId) {
  fetch(`http://localhost:3000/pups/${dogId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isGoodDog: dogStatus }),
  });
}

function dogFilter() {
  let filterDog = document.querySelector("#good-dog-filter");
  filterDog.innerText = "off";
  filterDog.addEventListener("click", function (e) {
    if (filterDog.innerText.includes("off")) {
      let dogName = document.querySelector("#dog-bar");
      dogName.innerHTML = "";
      fetchGoodDogs();
      filterDog.innerText = "on";
    } else {
      let dogName = document.querySelector("#dog-bar");
      dogName.innerHTML = "";
      fetchDogs();
      filterDog.innerText = "off";
    }
  });
}

function fetchGoodDogs() {
  fetch("http://localhost:3000/pups")
    .then((resp) => resp.json())
    .then((resp) => {
      dogfilter = resp.filter((dog) => dog.isGoodDog);
      renderDogs(dogfilter);
    });
}
