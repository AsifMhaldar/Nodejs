require('dotenv').config();
const express = require('express');
const app = express();
const db  = require('./db');
const bodyParser = require('body-parser');
const personRoutes = require('./Routes/PersonRoutes');
const menuRouter = require('./Routes/MenuItem');


app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Kasa ahes bhava");
});

app.use("/person", personRoutes);
app.use('/menu', menuRouter);


app.listen(process.env.PORT, () =>{
    console.log("Server is listening on 4000 port");
});