import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'react-bootstrap'; 
import axios from 'axios';

function MenuItems({ selectedCategory, onCategoryChange, onAddToCart, onRemoveFromCart }) {
  const [menuItems, setMenuItems] = useState([]);
  const itemRefs = useRef([]);

  useEffect(() => {
    axios.get('http://localhost:5001/menu')
      .then(response => setMenuItems(response.data))
      .catch(error => console.error("Error fetching menu", error));
  }, []);

  return (
    <div>
      <ul style={{ listStyleType: 'none'}}>
        {menuItems.map((item, index) => (
          <li
            key={item.name}
            data-category={item.category}
            className={`large-item-name`}
            ref={(el) => (itemRefs.current[index] = el)}
          >
            {item.name} - ${item.price}
            <Button variant="success" onClick={() => onAddToCart(item)}>+</Button>
            <Button variant="danger" onClick={() => onRemoveFromCart(item)}>-</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuItems;
