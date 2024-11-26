const express = require("express");
const cors = require("cors");
const path = require('path');
const { setupDatabase } = require("./database");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use('/photos', express.static(path.join(__dirname, 'photosback')));

setupDatabase();

app.use(routes);

app.get('/', (req, res) => {
    res.send("Welcome to the QR Code ordering App!");
});

app.listen(PORT, () => {
    console.log(`Server is running listening on port ${PORT}`);
});
