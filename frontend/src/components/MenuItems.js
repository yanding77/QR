import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function MenuItems({ onAddToCart, onRemoveFromCart }) {
  const [menuItems, setMenuItems] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});
  const itemRefs = useRef([]);

  useEffect(() => {
    axios
      .get('http://192.168.120.104:5001/menu')
      .then((response) => setMenuItems(response.data))
      .catch((error) => console.error("Error fetching menu", error));
  }, []);

  const handleAdd = (item) => {
    const newQuantities = { ...itemQuantities };
    if (!newQuantities[item.name]) {
      newQuantities[item.name] = 0;
    }
    newQuantities[item.name] += 1;
    setItemQuantities(newQuantities);
    onAddToCart(item);
  };

  const handleRemove = (item) => {
    const newQuantities = { ...itemQuantities };
    if (newQuantities[item.name]) {
      newQuantities[item.name] -= 1;
      if (newQuantities[item.name] === 0) {
        delete newQuantities[item.name];
      }
    }
    setItemQuantities(newQuantities);
    onRemoveFromCart(item);
  };

  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {menuItems.map((item, index) => (
        <li
          key={item.name}
          data-category={item.category}
          className="large-item-name"
          ref={(el) => (itemRefs.current[index] = el)}
          style={{
            paddingBottom: '20px',
            borderBottom: '1px solid #ddd', 
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',          
            }}
          >
            <span>{item.name} - ${item.price.toFixed(2)}</span>
          </div>

          <div style={{ marginBottom: '20px' }}>
            {item.image && (
              <img
                src={`http://192.168.120.104:5001/photos/${item.image}`}
                alt={item.name || 'Menu Item'}
                style={{
                  width: '100%',
                  maxWidth: '700px',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  objectFit: 'cover',
                  display: 'block', 
                  margin: '10px auto 0', 
                  border: '1px solid #ddd',
                }}
              />            
            )}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center', 
              alignItems: 'center',
              gap: '10px', 
            }}
          >
            <Button
              style={{
                backgroundColor: '#f5ebd5',
                border: 'none',
                color: '#000',
              }}
              variant="success"
              onClick={() => handleAdd(item)}
            >
              +
            </Button>
            {itemQuantities[item.name] > 0 && (
              <>
                <span style={{ margin: '0 10px' }}>{itemQuantities[item.name]}</span>
                <Button
                  style={{
                    backgroundColor: '#e74c3c',
                    border: 'none',
                    color: '#fff',
                  }}
                  variant="danger"
                  onClick={() => handleRemove(item)}
                >
                  -
                </Button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MenuItems;
