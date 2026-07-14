import React from "react";

function ProductTable({ productos, onEdit, onDelete }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No se encontraron productos.
              </td>
            </tr>
          ) : (
            productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.title}</td>
                <td>{producto.category}</td>
                <td>${producto.price}</td>
                <td>{producto.stock} u.</td>
                <td className="actions-cell">
                  <button 
                    className="btn-edit" 
                    onClick={() => onEdit(producto)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn-delete" 
                    onClick={() => onDelete(producto.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;