
import { useCallback, useEffect, useState } from "react";
import { todoApi } from "../services/todoApi";

export const useTodos = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchTodos = useCallback(async () => {
        try {
            setError("");
            setLoading(true);

            const response = await todoApi.getAll();
            setTodos(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let ignore = false;

        const loadTodos = async () => {
            try {
                const response = await todoApi.getAll();

                if (!ignore) {
                    setTodos(response.data);
                    setError("");
                }
            } catch (err) {
                if (!ignore) {
                    setError(err.message);
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        loadTodos();

        return () => {
            ignore = true;
        };
    }, []);

    const createTodo = async (payload) => {
        const response = await todoApi.create(payload);
        setTodos((prev) => [response.data, ...prev]);
    };

    const updateTodo = async (id, payload) => {
        const response = await todoApi.update(id, payload);

        setTodos((prev) =>
            prev.map((todo) =>
                todo._id === id ? response.data : todo
            )
        );
    };

    const deleteTodo = async (id) => {
        await todoApi.delete(id);

        setTodos((prev) =>
            prev.filter((todo) => todo._id !== id)
        );
    };

    return {
        todos,
        loading,
        error,
        createTodo,
        updateTodo,
        deleteTodo,
        refetch: fetchTodos,
    };
};
