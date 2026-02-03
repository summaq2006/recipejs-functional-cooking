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

const createRecipeCard = (recipe) => {
  return `
    <div class="recipe-card" data-id="${recipe.id}">
      <h3>${recipe.title}</h3>

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
  const filtered = filterRecipes(recipes, currentFilter);
  const sorted = sortRecipes(filtered, currentSort);
  renderRecipes(sorted);
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
//renderRecipes(recipes);
recipeContainer.addEventListener("click", (event) => {
  const target = event.target;

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

