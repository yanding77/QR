import React, { useState, useEffect } from 'react';

const Payment = ({ cartItems }) => {
    const [paymentData, setPaymentData] = useState({ amount: 0, items: [] });

    useEffect(() => {
        // Calculate the total price and prepare the items for the payment data
        const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
        setPaymentData({
            amount: totalAmount,
            items: cartItems
        });
    }, [cartItems]);

    const handlePayment = () => {
        fetch('http://localhost:5001/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => alert('Payment failed: ' + error));
    };

    return (
        <div>
            <h2>Order Now!</h2>
            <p>Total Amount: ${paymentData.amount.toFixed(2)}</p>
            <button onClick={handlePayment}>Pay</button>
        </div>
    );
}

export default Payment;