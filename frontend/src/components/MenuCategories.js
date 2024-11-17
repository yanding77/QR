import React from 'react';

function MenuCategories({ selectedCategory, onSelectCategory }) {
  const categories = [
    "Entrees", "Appetizers", "Vegetarian", "Salads", "Combos for 2", "Beverages",
    "Cocktails", "Desserts", "Family Packs", "Seasonal Specials", "Discounted Items"
  ];

  return (
    <div>
      <ul style={{ listStyleType: 'none'}}>
        {categories.map((category, index) => (
          <li key={index}>
            <button 
              onClick={() => onSelectCategory(category)} 
              className={`category-button ${category === selectedCategory ? 'highlight' : ''}`}>
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuCategories;
