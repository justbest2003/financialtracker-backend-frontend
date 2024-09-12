//npm install dotenv, express, cors, sequelize, pg, pg-hstore
const express = require("express");
const app = express();
const financialRouter = require("./router/financial.router");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const corsOptions = {
  origin: [
    "https://financialtracker-backend-frontend.vercel.app",
    "http://localhost:5173",
  ],
};

//use Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded
({extended:true}));

app.get("/", (req, res) => {
  res.send("<h1>Hello Financial Tracker API</h1>");
});

//use Router
app.use("/api/v1/financial", financialRouter);


app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
