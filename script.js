/*
EXTRA CREDIT: None.
*/

// Original animal data from the starter code. Do not change this array.
const animals = [
  { id: 1, name: "Luna", species: "cat", age: 3, adopted: false },
  { id: 2, name: "Biscuit", species: "dog", age: 7, adopted: true },
  { id: 3, name: "Pepper", species: "cat", age: 1, adopted: true },
  { id: 4, name: "Moose", species: "dog", age: 5, adopted: false },
  { id: 5, name: "Charly", species: "dog", age: 4, adopted: false },
  { id: 6, name: "Bill", species: "cat", age: 0.5, adopted: true },
  { id: 7, name: "Chompers", species: "rabbit", age: 0.5, adopted: false },
  { id: 8, name: "Beowulf", species: "dog", age: 7, adopted: true },
];

let activeFilter = "all";
let activeSort = "default";

// TODO 1: Display the animal cards and their information.
function displayAnimals(animalArray) {
  const animalList = document.querySelector("#animal-list");
  animalList.innerHTML = "";

  if (animalArray.length === 0) {
    animalList.textContent = "No animals match your selection.";
    return;
  }

  animalArray.forEach(function (animal) {
    const card = document.createElement("div");
    card.classList.add("animal-card");

    if (animal.adopted) {
      card.classList.add("adopted");
    }

    const name = document.createElement("h3");
    name.textContent = animal.name;

    const species = document.createElement("p");
    species.textContent = `Species: ${animal.species}`;

    const age = document.createElement("p");
    age.textContent = `Age: ${animal.age}`;

    const status = document.createElement("p");
    status.textContent = animal.adopted ? "Adopted" : "Available";

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = animal.adopted ? "Return" : "Adopt";

    // This callback runs when the user clicks the button.
    // The closure remembers the animal's id to identify which animal to update.
    button.addEventListener("click", function () {
      toggleAdoption(animal.id);
    });

    card.append(name, species, age, status, button);
    animalList.appendChild(card);
  });
}

// TODO 2: Adopt an available animal or return an adopted animal.
function toggleAdoption(animalId) {
  const animal = animals.find(function (item) {
    return item.id === animalId;
  });

  if (!animal) {
    return;
  }

  animal.adopted = !animal.adopted;
  updateDisplay();
}

// TODO 3: Filter and sort the animals.
function updateDisplay() {
  // Sorting changes an array in place, so I sort a copy to preserve
  // the original animals array and its starting order.
  let displayedAnimals = animals.slice();

  if (activeFilter === "available") {
    displayedAnimals = displayedAnimals.filter(function (animal) {
      return animal.adopted === false;
    });
  } else if (activeFilter === "adopted") {
    displayedAnimals = displayedAnimals.filter(function (animal) {
      return animal.adopted === true;
    });
  }

  if (activeSort === "name") {
    displayedAnimals.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  } else if (activeSort === "age") {
    displayedAnimals.sort(function (a, b) {
      return a.age - b.age;
    });
  }

  displayAnimals(displayedAnimals);
  updateCount();
}

// TODO 4: Display the number of available animals.
function updateCount() {
  const countElement = document.querySelector("#animal-count");

  const availableCount = animals.filter(function (animal) {
    return animal.adopted === false;
  }).length;

  countElement.textContent = `${availableCount} of ${animals.length} animals are available for adoption.`;
}

// TODO 5: Connect the filter buttons and sorting menu.
document.querySelector("#show-all").addEventListener("click", function () {
  activeFilter = "all";
  updateDisplay();
});

document
  .querySelector("#show-available")
  .addEventListener("click", function () {
    activeFilter = "available";
    updateDisplay();
  });

document.querySelector("#show-adopted").addEventListener("click", function () {
  activeFilter = "adopted";
  updateDisplay();
});

document
  .querySelector("#sort-animals")
  .addEventListener("change", function (event) {
    activeSort = event.target.value;
    updateDisplay();
  });

// Show the full animal list when the page first loads.
updateDisplay();
