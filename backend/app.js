const express = require("express");
const QR_Code = require("qrcode");
const cors = require("cors");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use('/photos', express.static(path.join(__dirname, 'photosback')));


app.get('/', (req, res) => {
    res.send("Welcome to the QR Code ordering App!");
});

app.get('/categories', (req, res) => {
    const categories = [
        "Entradas", "Ceviches", "Caldos y Sopas", "Platos Tipicos", "Banderas", "Sanduches",
        "Menu Ninos", "Adicionales", "Desayuno y Tarde", "Piqueos", "Postres", "Bebidas Calientes", "Gaseosas", "Tragos", "Cervezas", 
      ];
    res.json(categories);
});

app.get('/menu', (req, res) => {
    const menu = [
        // Entrees
        { name: "Ensalada Cesar de Pollo", category: "Entradas", price: 9.80},
        { name: "Ensalada Fria", category: "Entradas", price: 6.20 },
        { name: "Humita", category: "Entradas", price: 5.15 , image: "4.jpeg"},
        { name: "Hayaca", category: "Entradas", price: 6.20 },
        { name: "Muchines", category: "Entradas", price: 6.80 , image: "6.jpeg"},
        { name: "Patacones", category: "Entradas", price: 3.75 },
        { name: "Maduro", category: "Entradas", price: 16.99 },
        { name: "Empanaditas de Viento con Queso", category: "Entradas", price: 6.95 },
        { name: "Empanaditas MIxtas", category: "Entradas", price: 6.95 },
        { name: "Tortitas de Verde" , category: "Entradas", price: 5.20 },
    
        // Appetizers
        { name: "Ceviche de Camaron", category: "Ceviches", price: 12.95 },
        { name: "Ceviche de Pescado", category: "Ceviches", price: 13.40 },
        { name: "Ceviche de Concha", category: "Ceviches", price: 14.90 },
        { name: "Ceviche de Camaron con Calamar", category: "Ceviches", price: 13.95 },
        { name: "Ceviche de Mixto", category: "Ceviches", price: 13.95 },


    
        // Vegetarian
        { name: "Caldo de Salchicha", category: "Caldos y Sopas", price: 8.25, image: "1.jpeg"},
        { name: "Caldo de Pata", category: "Caldos y Sopas", price: 7.95 },
        { name: "Encebollado de Pescado", category: "Caldos y Sopas", price: 7.95 },
        { name: "Encebollado Mixto", category: "Caldos y Sopas", price: 9.45 },
        { name: "Meloso de Gallina", category: "Caldos y Sopas", price: 7.95 },
        { name: "Aguado de Gallina", category: "Caldos y Sopas", price: 7.95 },
        { name: "Caldo de Gallina", category: "Caldos y Sopas", price: 7.99 },
        { name: "Locro de Papas con Cuero", category: "Caldos y Sopas", price: 7.95 },
        { name: "Caldo de Bola", category: "Caldos y Sopas", price: 9.85 },


    
        // Salads
        { name: "Guatita", category: "Platos Tipicos", price: 13.75 },
        { name: "Seco de Gallina", category: "Platos Tipicos", price: 14.95, image: "7.jpeg"},
        { name: "Seco de Chivo", category: "Platos Tipicos", price: 16.95 , image: "13.jpeg"},
        { name: "Seco de Chancho", category: "Platos Tipicos", price: 14.90 , image: "5.jpeg"},
        { name: "Fritada", category: "Platos Tipicos", price: 15.20, image: "2.jpeg"},
        { name: "Lomo Apanado", category: "Platos Tipicos", price: 12.95},
        { name: "Churrasco", category: "Platos Tipicos", price: 14.45 , image: "11.jpeg"},
        { name: "Lomito Saltado", category: "Platos Tipicos", price: 14.45},
        { name: "Chuleta y arroz con menestra", category: "Platos Tipicos", price: 12.95, image: "3.jpeg"},
        { name: "Pollo y arroz con menestra", category: "Platos Tipicos", price: 12.95},
        { name: "Carne y arroz con menestra", category: "Platos Tipicos", price: 13.95},
        { name: "Lomo fino a la plancha", category: "Platos Tipicos", price: 17.65 , image: "12.jpeg"},
        { name: "Sango de Choclo con camaron", category: "Platos Tipicos", price: 13.95},
        { name: "Cazuela de Pescado", category: "Platos Tipicos", price: 12.45},
        { name: "Cazuela Mixta", category: "Platos Tipicos", price: 13.95},
        { name: "Cazuela LLapingacho", category: "Platos Tipicos", price: 13.95},
        { name: "Bandera Mixta", category: "Platos Tipicos", price: 13.95, image: "9.jpeg"},





    
        { name: "Sándwich de Pollo", category: "Sanduches", price: 6.50 },
        { name: "Sándwich de Jamón y Queso", category: "Sanduches", price: 5.00 },
        { name: "Sándwich Vegetariano", category: "Sanduches", price: 5.80 },
        
        // Menu Ninos
        { name: "Pechuga de Pollo con Papas Fritas", category: "Menu Ninos", price: 4.50 },
        { name: "Mini Hamburguesa con Papas", category: "Menu Ninos", price: 4.00 },
        { name: "Pizza Personal", category: "Menu Ninos", price: 4.20 },
        
        // Adicionales
        { name: "Papas Fritas", category: "Adicionales", price: 2.00 },
        { name: "Arroz Blanco", category: "Adicionales", price: 1.50 },
        { name: "Ensalada Mixta", category: "Adicionales", price: 2.30 },
        
        // Desayuno y Tarde
        { name: "Desayuno Tradicional", category: "Desayuno y Tarde", price: 7.00 },
        { name: "Tostadas con Mantequilla", category: "Desayuno y Tarde", price: 3.50 },
        { name: "Café con Leche", category: "Desayuno y Tarde", price: 2.50 },
        
        // Piqueos
        { name: "Yuca con Salsa", category: "Piqueos", price: 3.80 },
        { name: "Tostones con Guacamole", category: "Piqueos", price: 4.20 },
        { name: "Alitas de Pollo", category: "Piqueos", price: 5.00 },
        
        // Postres
        { name: "Tarta de Manzana", category: "Postres", price: 3.00 },
        { name: "Flan Casero", category: "Postres", price: 2.80 },
        { name: "Helado de Chocolate", category: "Postres", price: 2.50 , image: "8.jpeg"},
        
        // Bebidas Calientes
        { name: "Café Americano", category: "Bebidas Calientes", price: 1.80 },
        { name: "Té Verde", category: "Bebidas Calientes", price: 1.50 },
        { name: "Chocolate Caliente", category: "Bebidas Calientes", price: 2.20 },
        
        // Gaseosas
        { name: "Coca-Cola", category: "Gaseosas", price: 1.20 },
        { name: "Sprite", category: "Gaseosas", price: 1.20 },
        { name: "Fanta", category: "Gaseosas", price: 1.20 },
        
        // Tragos
        { name: "Mojito", category: "Tragos", price: 5.50 },
        { name: "Pisco Sour", category: "Tragos", price: 6.00 },
        { name: "Caipirinha", category: "Tragos", price: 5.80 },
        
        // Cervezas
        { name: "Club Verde", category: "Cervezas", price: 2.50 },
        { name: "Pilsener", category: "Cervezas", price: 3.50 },
        { name: "Pilsener Light", category: "Cervezas", price: 3.50 },
        { name: "Budweiser", category: "Cervezas", price: 3.50 },
        { name: "Stella-Artois", category: "Cervezas", price: 3.50 },
        { name: "Cerveza Artesanal", category: "Cervezas", price: 4.00 }
    ];
    res.json(menu);
});




app.post('/payment', (req, res) =>{
    const paymentData = req.body;
    console.log("Payment succesfull: ", paymentData);
    res.status(200).json({
        message: "Orden Exitosa!"
    });
});

app.get('/generate-qr', (req, res) =>{
    const url = 'http://192.168.120.104:3000';
    QR_Code.toDataURL(url, (err, src) =>{
        res.json({ qrCode: src});
    });
});

app.listen(PORT, () =>{
    console.log("Server is running listening on port " + PORT);
});