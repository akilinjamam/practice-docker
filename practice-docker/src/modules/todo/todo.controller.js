const todoService = require("./todo.service");

const createTodo = async (req, res, next) => {
    try {
        const todo = await todoService.createTodo(req.body);

        res.status(201).json({
            success: true,
            message: "Todo created successfully",
            data: todo,
        });
    } catch (error) {
        next(error);
    }
};

const getAllTodos = async (req, res, next) => {
    try {
        const todos = await todoService.getAllTodos();

        res.status(200).json({
            success: true,
            message: "Todos retrieved successfully",
            data: todos,
        });
    } catch (error) {
        next(error);
    }
};

const getSingleTodo = async (req, res, next) => {
    try {
        const { id } = req.params;

        const todo = await todoService.getSingleTodo(id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Todo retrieved successfully",
            data: todo,
        });
    } catch (error) {
        next(error);
    }
};

const updateTodo = async (req, res, next) => {
    try {
        const { id } = req.params;

        const todo = await todoService.updateTodo(id, req.body);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            data: todo,
        });
    } catch (error) {
        next(error);
    }
};

const deleteTodo = async (req, res, next) => {
    try {
        const { id } = req.params;

        const todo = await todoService.deleteTodo(id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
            data: todo,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createTodo,
    getAllTodos,
    getSingleTodo,
    updateTodo,
    deleteTodo,
};