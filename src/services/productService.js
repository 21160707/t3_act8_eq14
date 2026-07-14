import api from "./api";

export const obtenerProductos = async (limit = 1000, skip = 0) => {
    const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
    return response.data;
};

export const obtenerCategorias = async () => {
    const response = await api.get("/products/categories");
    return response.data;
};

export const agregarProducto = async (producto) => {
    const response = await api.post("/products/add", producto);
    return response.data;
};

export const editarProducto = async (id, producto) => {
    const response = await api.put(`/products/${id}`, producto);
    return response.data;
};

export const eliminarProducto = async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
};