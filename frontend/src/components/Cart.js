import React from 'react';

function Cart({ cart, onClearCart }) {
  return (
    <div style={{ fontFamily: 'Georgia, serif', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', fontSize: '24px' }}>Tu Orden</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <ul style={{ paddingLeft: '20px' }}>
            {cart.map((item, index) => (
              <li key={index} style={{ fontSize: '18px', marginBottom: '5px' }}>
                {item.name} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Cart;
