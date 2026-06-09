/**
 * @param {string} photo
 * @param {string} category
 * @param {string} title
 * @param {string|number} price
 * @param {string} byWhom
 * @returns {HTMLElement}
 */
import { categoryColors } from "./data.js";

export default function createCard(photo, category, title, price, byWhom) {
  const template = document.createElement("template");
  const bgColor = categoryColors[category] || "#9A9CA5";

  template.innerHTML = `
    <article class="card">
      <div class="card__image-wrapper">
        <img src="${photo}" alt="${title}" class="card__image" loading="lazy" />
      </div>
      <div class="card__body">
        <span class="card__category" style="background-color: ${bgColor};">${category}</span>
        <h3 class="card__title">${title}</h3>
        <div class="card__footer">
          <span class="card__price">${String(price).startsWith("$") ? price : "$" + price}</span>
          <span class="card__author"><span class="card__separator">|</span> by ${byWhom}</span>
        </div>
      </div>
    </article>
  `;

  return template.content.firstElementChild.cloneNode(true);
}
