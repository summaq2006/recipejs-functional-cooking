// ==============================
// Recipe Data (Static Array)
// ==============================
(() => {
const recipes = [
  {
  id: 1,
  title: "Spaghetti Aglio e Olio",
  time: 25,
  difficulty: "easy",
  description: "A simple Italian pasta made with garlic, olive oil, and chili flakes.",
  category: "pasta",
  ingredients: [
    "Spaghetti",
    "Garlic",
    "Olive oil",
    "Chili flakes",
    "Salt"
  ],
  steps: [
    "Boil water and cook spaghetti",
    [
      "Heat olive oil",
      "Add garlic",
      "Add chili flakes"
    ],
    "Mix pasta with sauce",
    "Serve hot"
  ]
  },
 {
  id: 2,
  title: "Greek Salad",
  time: 15,
  difficulty: "easy",
  description: "A fresh salad with tomatoes, cucumbers, olives, and feta cheese.",
  category: "salad",
  ingredients: [
    "Tomatoes",
    "Cucumbers",
    "Onion",
    "Olives",
    "Feta cheese",
    "Olive oil",
    "Salt",
    "Pepper"
  ],
  steps: [
    "Wash all vegetables",
    [
      "Chop tomatoes",
      "Slice cucumbers",
      "Cut onions thinly"
    ],
    "Add olives and feta cheese",
    [
      "Drizzle olive oil",
      "Season with salt and pepper"
    ],
    "Mix gently and serve fresh"
  ]
  },
  {
    id: 3,
    title: "Butter Chicken",
    time: 60,
    difficulty: "medium",
    description: "A rich and creamy Indian chicken curry cooked with spices.",
    category: "curry"
  },
  {
    id: 4,
    title: "Paneer Tikka Masala",
    time: 50,
    difficulty: "medium",
    description: "Paneer cubes cooked in a spicy tomato-based gravy.",
    category: "curry"
  },
  {
    id: 5,
    title: "Mushroom Risotto",
    time: 65,
    difficulty: "medium",
    description: "A creamy rice dish slowly cooked with mushrooms and stock.",
    category: "rice"
  },
  {
    id: 6,
    title: "Lasagna",
    time: 75,
    difficulty: "hard",
    description: "Layered pasta with cheese, sauce, and baked to perfection.",
    category: "pasta"
  },
  {
    id: 7,
    title: "Beef Wellington",
    time: 90,
    difficulty: "hard",
    description: "A classic dish of beef wrapped in pastry and baked.",
    category: "meat"
  },
  {
    id: 8,
    title: "Vegetable Stir Fry",
    time: 30,
    difficulty: "easy",
    description: "Quick stir-fried vegetables with light seasoning.",
    category: "vegetable"
  }

];
let currentFilter = "all";
let currentSort = "none";
let searchQuery = "";
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// ==============================
// DOM Selection
// ==============================

const recipeContainer = document.querySelector("#recipe-container");
const filterRecipes = (recipes, filter) => {
  switch (filter) {
    case "easy":
      return recipes.filter(recipe => recipe.difficulty === "easy");
    case "medium":
      return recipes.filter(recipe => recipe.difficulty === "medium");
    case "hard":
      return recipes.filter(recipe => recipe.difficulty === "hard");
    case "quick":
      return recipes.filter(recipe => recipe.time < 30);
    default:
      return recipes;
  }
};
const sortRecipes = (recipes, sortType) => {
  const sorted = [...recipes]; // copy to avoid mutation

  switch (sortType) {
    case "name":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "time":
      return sorted.sort((a, b) => a.time - b.time);
    default:
      return sorted;
  }
};
const searchRecipes = (recipes, query) => {
  if (!query) return recipes;

  query = query.toLowerCase();

  return recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(query) ||
    (recipe.ingredients || []).some(ing =>
      ing.toLowerCase().includes(query)
    )
  );
};
const toggleFavorite = (id) => {

  if (favorites.includes(id)) {
    favorites = favorites.filter(favId => favId !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateDisplay();
};
const applyFavoritesFilter = (recipes) => {

  const favOnly =
    document.querySelector("#favoritesOnly").checked;

  if (!favOnly) return recipes;

  return recipes.filter(recipe =>
    favorites.includes(recipe.id)
  );
};
const updateRecipeCounter = (shown, total) => {
  document.querySelector("#recipeCounter")
    .textContent = `Showing ${shown} of ${total} recipes`;
};

const debounce = (func, delay) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const createRecipeCard = (recipe) => {
   const isFavorite = favorites.includes(recipe.id);
  return `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}
       <button class="favorite-btn">
          ${isFavorite ? "❤️" : "🤍"}
        </button>
      </h3>


      <div class="recipe-meta">
        <span>⏱️ ${recipe.time} min</span>
        <span class="difficulty ${recipe.difficulty}">
          ${recipe.difficulty}
        </span>
      </div>

      <p>${recipe.description}</p>

      <div class="recipe-actions">
        <button class="toggle-ingredients">Show Ingredients</button>
        <button class="toggle-steps">Show Steps</button>
      </div>

      <div class="recipe-details ingredients hidden">
        <h4>Ingredients</h4>
        <ul></ul>
      </div>

      <div class="recipe-details steps hidden">
        <h4>Steps</h4>
        <ol></ol>
      </div>
    </div>
  `;
};



const renderRecipes = (recipeList) => {
  const recipeHTML = recipeList
    .map(recipe => {
      const cardHTML = createRecipeCard(recipe);
      return cardHTML;
    })
    .join("");

  recipeContainer.innerHTML = recipeHTML;

  // Populate ingredients and steps
  recipeList.forEach(recipe => {
    const card = recipeContainer.querySelector(
      `.recipe-card[data-id="${recipe.id}"]`
    );

    if (!card) return;

    // Ingredients
    const ingredientsList = card.querySelector(".ingredients ul");
    if (recipe.ingredients && ingredientsList) {
      ingredientsList.innerHTML = recipe.ingredients
        .map(item => `<li>${item}</li>`)
        .join("");
    }

    // Steps (recursive)
    const stepsList = card.querySelector(".steps ol");
    if (recipe.steps && stepsList) {
      stepsList.innerHTML = renderSteps(recipe.steps);
    }
  });
};
const renderSteps = (steps) => {
  return steps.map(step => {
    if (Array.isArray(step)) {
      return `<ol>${renderSteps(step)}</ol>`;
    }
    return `<li>${step}</li>`;
  }).join("");
};

// ==============================
// Initialize App
// ==============================
const updateDisplay = () => {

  let result = filterRecipes(recipes, currentFilter);

  result = searchRecipes(result, searchQuery);

  result = applyFavoritesFilter(result);

  result = sortRecipes(result, currentSort);

  renderRecipes(result);

  updateRecipeCounter(result.length, recipes.length);
};
const init = () => {
  updateDisplay();
};
document.querySelectorAll("[data-filter]").forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    updateDisplay();
  });
});

// Sort buttons
document.querySelectorAll("[data-sort]").forEach(button => {
  button.addEventListener("click", () => {
    currentSort = button.dataset.sort;
    updateDisplay();
  });
});
const searchInput = document.querySelector("#searchInput");

searchInput.addEventListener(
  "input",
  debounce((e) => {
    searchQuery = e.target.value;
    updateDisplay();
  }, 300)
);
document
  .querySelector("#favoritesOnly")
  .addEventListener("change", updateDisplay); 
//renderRecipes(recipes);
recipeContainer.addEventListener("click", (event) => {
  const target = event.target;

   if (target.classList.contains("favorite-btn")) {
    const card = target.closest(".recipe-card");
    const id = Number(card.dataset.id);

    toggleFavorite(id);
  }
  // Toggle Ingredients
  if (target.classList.contains("toggle-ingredients")) {
    const card = target.closest(".recipe-card");
    const ingredientsSection = card.querySelector(".ingredients");

    ingredientsSection.classList.toggle("hidden");
    target.textContent = ingredientsSection.classList.contains("hidden")
      ? "Show Ingredients"
      : "Hide Ingredients";
  }

  // Toggle Steps
  if (target.classList.contains("toggle-steps")) {
    const card = target.closest(".recipe-card");
    const stepsSection = card.querySelector(".steps");

    stepsSection.classList.toggle("hidden");
    target.textContent = stepsSection.classList.contains("hidden")
      ? "Show Steps"
      : "Hide Steps";
  }
});

init();
})();

