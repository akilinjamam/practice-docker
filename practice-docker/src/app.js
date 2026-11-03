const express = require("express");

const todoRoutes = require("./modules/todo/todo.route");
const cors = require("cors");
const notFoundHandler = require("./middlewares/not-found.middleware");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

// Built-in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: [
            "http://todo.mediposbd.com",
            "https://todo.mediposbd.com",
            "http://103.14.23.180:3007" // Optional: keep your local IP if you still test via IP directly
        ],
        credentials: true, // Optional: set to true if your frontend sends cookies or Authorization headers
    })
);

// Health check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Todo API is running",
    });
});

// API routes
app.use("/api/v1/todos", todoRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;