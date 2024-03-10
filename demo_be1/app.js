const express = require('express');
const cors = require('cors');
require("dotenv").config()
require("./config/db")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/api", express.static("./uploads"));

app.use("/api", require("./routes"))

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log("server is stated")
})