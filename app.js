// ==============================
// Recipe Data (Static Array)
// ==============================

const recipes = [
  {
    id: 1,
    title: "Spaghetti Aglio e Olio",
    time: 25,
    difficulty: "easy",
    description: "A simple Italian pasta made with garlic, olive oil, and chili flakes.",
    category: "pasta"
  },
  {
    id: 2,
    title: "Greek Salad",
    time: 15,
    difficulty: "easy",
    description: "A fresh salad with tomatoes, cucumbers, olives, and feta cheese.",
    category: "salad"
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

// ==============================
// DOM Selection
// ==============================

const recipeContainer = document.querySelector("#recipe-container");

// ==============================
// Create Recipe Card
// ==============================

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
    </div>
  `;
};

// ==============================
// Render Recipes
// ==============================

const renderRecipes = (recipeList) => {
  const recipeHTML = recipeList
    .map(createRecipeCard)
    .join("");

  recipeContainer.innerHTML = recipeHTML;
};

// ==============================
// Initialize App
// ==============================

renderRecipes(recipes);
