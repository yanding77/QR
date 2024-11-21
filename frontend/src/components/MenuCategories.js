import React, { useEffect, useState, } from 'react';
import axios from 'axios';


function MenuCategories({ selectedCategory, onSelectCategory }) {
  const [MenuCategories, setMenuCategories] = useState([]);
  useEffect(() => {
    axios
      .get('http://192.168.120.104:5001/categories')
      .then((response) => setMenuCategories(response.data))
      .catch((error) => console.error("Error fetching categories", error));
  }, []);

  return (
    <div>
      <ul style={{ listStyleType: 'none'}}>
        {MenuCategories.map((category, index) => (
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
