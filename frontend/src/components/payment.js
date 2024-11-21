import React, { useState, useEffect } from 'react';

const Payment = ({ cartItems, onClearCart }) => {
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
        fetch('http://192.168.120.104:5001/payment', {
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
        <div style={{
            fontFamily: 'Lora, serif',
            marginTop: '40px'
        }}>
            <div style={{
                textAlign: 'right',  
                marginBottom: '10px' 
            }}>
                <p>Valor a Pagar: ${paymentData.amount.toFixed(2)}</p>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',  
                alignItems: 'center'
            }}>
                <button 
                    style={{
                        backgroundColor: 'red', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: 'pointer'}}
                    onClick={onClearCart}>Vaciar Carrito</button>

                <button 
                    style={{
                        backgroundColor: 'green', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: 'pointer'}}
                    onClick={handlePayment}>Pide Ahora!</button>
            </div>
        </div>
    );
}

export default Payment;
