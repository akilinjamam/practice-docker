const express = require("express");

const todoController = require("./todo.controller");

const router = express.Router();

router.post("/", todoController.createTodo);

router.get("/", todoController.getAllTodos);

router.get("/:id", todoController.getSingleTodo);

router.patch("/:id", todoController.updateTodo);

router.delete("/:id", todoController.deleteTodo);

module.exports = router;