import React, { useState, useEffect } from "react";

function ProductModal({ producto, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (producto) {
      setFormData({
        title: producto.title || "",
        category: producto.category || "",
        price: producto.price || "",
        stock: producto.stock || "",
      });
    } else {
      setFormData({
        title: "",
        category: "",
        price: "",
        stock: "",
      });
    }
  }, [producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.price || !formData.stock) {
      alert("Todos los campos son obligatorios");
      return;
    }
    onSave({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    });
  };

  return (
    <div className="modal-overlay" style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div className="modal-content" style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        width: "400px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
      }}>
        <h2>{producto ? "Editar Producto" : "Agregar Producto"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Producto:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Categoría:</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Precio:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Stock:</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>

          <div className="modal-actions" style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button type="button" onClick={onClose} style={{ padding: "8px 16px" }}>
              Cancelar
            </button>
            <button type="submit" style={{ padding: "8px 16px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px" }}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;