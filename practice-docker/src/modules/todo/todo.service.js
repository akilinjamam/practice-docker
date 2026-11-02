const Todo = require("./todo.model");

const createTodo = async (payload) => {
    return await Todo.create(payload);
};

const getAllTodos = async () => {
    return await Todo.find().sort({ createdAt: -1 });
};

const getSingleTodo = async (id) => {
    return await Todo.findById(id);
};

const updateTodo = async (id, payload) => {
    return await Todo.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};

const deleteTodo = async (id) => {
    return await Todo.findByIdAndDelete(id);
};

module.exports = {
    createTodo,
    getAllTodos,
    getSingleTodo,
    updateTodo,
    deleteTodo,
};