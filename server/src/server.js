const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const app = express();
connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ verify: (req, buf) => {
        req.rawBody = buf;
    }}));
const port= process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("Hello World!");
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})