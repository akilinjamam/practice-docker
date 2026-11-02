const express = require("express");

const todoRoutes = require("./modules/todo/todo.route");
const cors = require("cors");
const notFoundHandler = require("./middlewares/not-found.middleware");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

// Built-in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: [
        'http://103.14.23.180:3007', // Your live VPS React frontend
        'http://localhost:5173',       // For local Vite development
        'http://localhost:3000'        // If you test locally on 3000
    ],
    credentials: true,               // Allow cookies/authorization headers if needed
    optionsSuccessStatus: 200
};
app.use(corsOptions)

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