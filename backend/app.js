const express = require("express");
const QR_Code = require("qrcode");
const BodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to the QR Code ordering App!");
});

app.get('/menu', (req, res) => {
    const menu = [
        {id: 1, name: "Beef", price: 10.00},
        {id: 2, name: "Chicken", price: 8.00},
        {id: 3, name: "Pork", price: 6.00}
    ];
    res.json(menu);
});

app.post('/order', (req, res) =>{
    const order = req.body;
    console.log("Order received: ", order);
    res.status(201).json({
        message: "Order created succesfully"
    });
});

app.post('/payment', (req, res) =>{
    const paymentData = req.body;
    console.log("Payment succesfull: ", paymentData);
    res.status(200).json({
        message: "payment processed succesfully"
    });
});

app.get('/generate-qr', (req, res) =>{
    const url = 'http://localhost:3000/menu';
    QR_Code.toDataURL(url, (err, src) =>{
        res.json({ qrCode: src});
    });
});

app.listen(PORT, () =>{
    console.log("Server is running listening on port " + PORT);
});