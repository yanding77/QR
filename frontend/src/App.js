import React, { useState, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MenuCategories from './components/MenuCategories';
import MenuItems from './components/MenuItems';
import Cart from './components/Cart';
import Payment from './components/payment';
import QRCode from './components/QRCode';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false); 
  const menuItemsRef = useRef(null);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);

    if (menuItemsRef.current) {
      const menuItemsContainer = menuItemsRef.current;
      const categoryItems = menuItemsRef.current.querySelectorAll(`[data-category="${category}"]`);

      if (categoryItems.length > 0) {
        const targetItem = categoryItems[0];
        const containerTop = menuItemsContainer.getBoundingClientRect().top;
        const targetTop = targetItem.getBoundingClientRect().top;
        const scrollOffset = targetTop - containerTop + menuItemsContainer.scrollTop;

        menuItemsContainer.scrollTo({
          top: scrollOffset,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleAddToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const handleRemoveFromCart = (itemToRemove) => {
    setCart((prevCart) => prevCart.filter(item => item.name !== itemToRemove.name));
  };

  const handleCartButtonClick = () => {
    setShowCart(!showCart);
  };

  const handleGoBack = () => {
    setShowCart(false);
  };

  return (
    <Container fluid className="App">
      <h1 className="text-center my-4">QR Code Ordering App</h1>
      <h2>Menu</h2>
      <Row>
        <Col xs={3} className="menu-categories">
          <MenuCategories 
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory} 
          />
        </Col>
        <Col xs={9} className="menu-items" ref={menuItemsRef}>
          <MenuItems 
            selectedCategory={selectedCategory} 
            onAddToCart={handleAddToCart} 
            onRemoveFromCart={handleRemoveFromCart}
          />
        </Col>
      </Row>

      <div className="cart-payment-container d-flex justify-content-end">
        <div 
          className="cart-button" 
          onClick={handleCartButtonClick}
          role="button"
        >
          <img src={require('./photos/hola.png')} alt="Cart" className="cart-icon" />
          {cart.length > 0 && (
            <div className="cart-count">{cart.length}</div>
          )}
        </div>
      </div>

      {showCart && (
        <div className="cart-overlay">
          <div className="cart-content">
            <button className="go-back-button" onClick={handleGoBack}>Go Back</button>
            <Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} />
            <Payment cartItems={cart} />
          </div>
        </div>
      )}
    </Container>
  );
}

export default App;
