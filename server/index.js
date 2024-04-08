const express = require('express');
const app = express();
require("dotenv").config();
const cors = require("cors")

const PORT = process.env.PORT || 5050;

const apiRoutes = require('./routes/api-routes')

app.use(cors());

app.use(express.json());


app.use('/listings', apiRoutes);


app.listen(PORT, () => {
console.log(`running at http://localhost:${PORT}`);
});