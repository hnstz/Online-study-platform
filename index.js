import createCard from "./Card.js";
import { categories, coursesData } from "./data.js";

const categoriesContainer = document.getElementById("categories-container");
const coursesGrid = document.getElementById("courses-grid");
const searchInput = document.getElementById("course-search");
const searchForm = document.querySelector(".search-form");

let currentCategory = "all";
let searchQuery = "";

function renderCategories() {
  if (!categoriesContainer) return;
  categoriesContainer.innerHTML = "";

  categories.forEach((category) => {
    const li = document.createElement("li");
    li.className = "courses__filter-item";

    const button = document.createElement("button");
    button.className = `courses__filter-btn ${category.isActive ? "courses__filter-btn--active" : ""}`;
    button.dataset.category = category.id;

    const countDisplay = category.count > 0 ? category.count : "";
    button.innerHTML = `${category.name} <sup class="courses__filter-count">${countDisplay}</sup>`;

    li.appendChild(button);
    categoriesContainer.appendChild(li);
  });
}

function renderCards() {
  if (!coursesGrid) return;
  coursesGrid.innerHTML = "";

  coursesData.forEach((course) => {
    const cardElement = createCard(
      course.photo,
      course.category,
      course.title,
      course.price,
      course.byWhom,
    );

    const targetCategory = categories.find((c) => c.name === course.category);
    if (targetCategory) {
      targetCategory.count += 1;
      cardElement.dataset.category = targetCategory.id;
    }

    const allCategory = categories.find((c) => c.id === "all");
    if (allCategory) {
      allCategory.count += 1;
    }

    coursesGrid.appendChild(cardElement);
  });
}

function updateCardsVisibility() {
  const cards = coursesGrid.querySelectorAll(".card");
  let visibleCount = 0;

  cards.forEach((card) => {
    const cardCategory = card.dataset.category;
    const cardTitle = card
      .querySelector(".card__title")
      .textContent.toLowerCase();

    const matchesCategory =
      currentCategory === "all" || cardCategory === currentCategory;
    const matchesSearch = cardTitle.includes(searchQuery);

    if (matchesCategory && matchesSearch) {
      card.style.display = "";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  let noResultsMsg = document.getElementById("no-results-msg");

  if (visibleCount === 0) {
    if (!noResultsMsg) {
      noResultsMsg = document.createElement("p");
      noResultsMsg.id = "no-results-msg";
      noResultsMsg.className = "courses__no-results";
      noResultsMsg.textContent = "Sorry, nothing found";
      coursesGrid.appendChild(noResultsMsg);
    } else {
      noResultsMsg.style.display = "block";
    }
  } else if (noResultsMsg) {
    noResultsMsg.style.display = "none";
  }
}

renderCards();
renderCategories();

categoriesContainer.addEventListener("click", (e) => {
  const button = e.target.closest(".courses__filter-btn");
  if (!button) return;

  document.querySelectorAll(".courses__filter-btn").forEach((btn) => {
    btn.classList.remove("courses__filter-btn--active");
  });

  button.classList.add("courses__filter-btn--active");

  currentCategory = button.dataset.category;
  updateCardsVisibility();
});

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    updateCardsVisibility();
  });
}

if (searchForm) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}
