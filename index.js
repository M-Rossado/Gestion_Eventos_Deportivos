const express = require('express');
require("dotenv").config();

const connectDB = require('./src/utils/db_sportevent');
connectDB();

const routes = require('./src/api/routers/routes')


const server = express();
server.use(express.json());

const PORT = process.env.PORT;
server.listen(PORT, () =>{
    console.log(`server running port http://localhost:${PORT}`);
});

server.use('/', routes);
