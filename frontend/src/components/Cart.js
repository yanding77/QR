import React from 'react';

function Cart({ cart }) {
  return (
    <div>
      <h2>Your Order</h2>
      {cart.length === 0 ? (
        <p>No items in your cart</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
