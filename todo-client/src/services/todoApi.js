const API_URL = `${import.meta.env.VITE_API_URL}/todos`;

const request = async (url, options = {}) => {
    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
    }

    return result;
};

export const todoApi = {
    getAll: () => request(API_URL),

    getSingle: (id) => request(`${API_URL}/${id}`),

    create: (payload) =>
        request(API_URL, {
            method: "POST",
            body: JSON.stringify(payload),
        }),

    update: (id, payload) =>
        request(`${API_URL}/${id}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
        }),

    delete: (id) =>
        request(`${API_URL}/${id}`, {
            method: "DELETE",
        }),
};