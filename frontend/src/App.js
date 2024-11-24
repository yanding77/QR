import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import MenuCategories from './components/MenuCategories';
import MenuItems from './components/MenuItems';
import Cart from './components/Cart';
import Payment from './components/payment';
import Footer from './components/footer';
import QRCode from './components/QRCode';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [menuItems, setMenuItems] = useState([]);  
  const [itemQuantities, setItemQuantities] = useState({});
  const menuItemsRef = useRef(null);

  useEffect(() => {
    axios
      .get('http://192.168.120.104:5001/menu')
      .then((response) => setMenuItems(response.data))
      .catch((error) => console.error("Error fetching menu", error));
  }, []);

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
    const newQuantities = { ...itemQuantities };
    newQuantities[item.name] = (newQuantities[item.name] || 0) + 1;
    setItemQuantities(newQuantities);
  };

  const handleRemoveFromCart = (itemToRemove) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex(item => item.name === itemToRemove.name);
      if (index !== -1) {
        const updatedCart = [...prevCart];
        updatedCart.splice(index, 1);
        return updatedCart;
      }
      return prevCart;
    });
    const newQuantities = { ...itemQuantities };
    if (newQuantities[itemToRemove.name]) {
      newQuantities[itemToRemove.name] -= 1;
      if (newQuantities[itemToRemove.name] === 0) {
        delete newQuantities[itemToRemove.name];
      }
    }
    setItemQuantities(newQuantities);
  };

  const handleCartButtonClick = () => {
    setShowCart(!showCart);
  };

  const handleGoBack = () => {
    setShowCart(false);
  };

  const handleClearCart = () => {
    setCart([]);
    setItemQuantities({});  
  };

  return (
    <Container fluid className="App">
      <h1>
        <img 
          src={require('./photos/title.jpeg')} 
          alt="La Balsa" 
          style={{ width: '100%', objectFit: 'cover' }}
        />
      </h1>

      <Row className="content-container">
        <Col xs={4} md={3} className="menu-categories">
          <MenuCategories 
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory} 
          />
        </Col>
        <Col xs={8} md={9} className="menu-items" ref={menuItemsRef}>
          <MenuItems 
            selectedCategory={selectedCategory} 
            menuItems={menuItems} 
            onAddToCart={handleAddToCart} 
            onRemoveFromCart={handleRemoveFromCart}
            itemQuantities={itemQuantities} 
            onCategoryChange={handleSelectCategory}
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
            <button className="go-back-button" onClick={handleGoBack}>Regresar</button>
            <Cart cart={cart} onRemoveFromCart={handleRemoveFromCart}/>
              {Object.keys(cart).length > 0 && (
              <Payment cartItems={cart} onClearCart={handleClearCart}/>
              )}
          </div>
        </div>
      )}
      <Footer/>
    </Container>
  );
}

export default App;
