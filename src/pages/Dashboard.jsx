import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ProductTable from "../components/ProductTable";
import ProductModal from "../components/ProductModal";
import {
  obtenerProductos,
  obtenerCategorias,
  agregarProducto,
  editarProducto,
  eliminarProducto,
} from "../services/productService";
import "../styles/dashboard.css";

function Dashboard({ user, setUser }) {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const paginaActual = parseInt(searchParams.get("page") || "1", 10);
  const limitePorPagina = parseInt(searchParams.get("limit") || "10", 10);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const handleEliminar = async (id) => {
    const resultado = await Swal.fire({
      title: "¿Seguro que deseas eliminar este producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (!resultado.isConfirmed) return;

    try {
      await eliminarProducto(id);
      setProductos(productos.filter((p) => p.id !== id));
      Swal.fire("¡Eliminado!", "Producto eliminado con éxito", "success");
    } catch {
      Swal.fire("Error", "No se pudo eliminar el producto", "error");
    }
  };

  const handleGuardar = async (datosFormulario) => {
    try {
      if (productoSeleccionado) {
        const resultado = await Swal.fire({
          title: "¿Deseas guardar los cambios?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#28a745",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Sí, guardar",
          cancelButtonText: "Cancelar"
        });

        if (!resultado.isConfirmed) return;

        const actualizado = await editarProducto(productoSeleccionado.id, datosFormulario);
        setProductos(
          productos.map((p) => (p.id === productoSeleccionado.id ? { ...p, ...actualizado } : p))
        );
        Swal.fire("¡Editado!", "Producto editado con éxito", "success");
      } else {
        const creado = await agregarProducto(datosFormulario);
        const nuevoProducto = { ...creado, id: Date.now() };
        setProductos([nuevoProducto, ...productos]);
        Swal.fire("¡Creado!", "Producto creado con éxito", "success");
      }
      setModalAbierto(false);
    } catch {
      Swal.fire("Error", "Ocurrió un problema al procesar la acción", "error");
    }
  };

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);
      setError("");
      try {
        const data = await obtenerProductos();
        setProductos(data.products);

        const categoriasData = await obtenerCategorias();
        setCategorias(categoriasData);
      } catch {
        setError("Error al cargar los productos. Por favor, inténtelo de nuevo.");
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  const productosFiltrados = productos.filter((producto) => {
    const coincideNombre = producto.title
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    if (categoriaSeleccionada === "") return coincideNombre;

    const categoriaObj = categorias.find(c => c.slug === categoriaSeleccionada);
    const nombreCategoria = categoriaObj ? categoriaObj.name.toLowerCase() : "";
    const slugCategoria = categoriaSeleccionada.toLowerCase();
    const categoriaProducto = (producto.category || "").toLowerCase();

    const coincideCategoria = 
      categoriaProducto === slugCategoria || 
      categoriaProducto === nombreCategoria ||
      categoriaProducto.includes(slugCategoria) ||
      slugCategoria.includes(categoriaProducto);

    return coincideNombre && coincideCategoria;
  });

  const fin = paginaActual * limitePorPagina;
  const inicio = fin - limitePorPagina;
  const productosPaginados = productosFiltrados.slice(inicio, fin);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="main-content">
        <Navbar user={user} setUser={setUser} />

        <section className="content">
          <h1 className="welcome-title">Bienvenido al sistema</h1>
          <p className="welcome-subtitle">Has iniciado sesión correctamente.</p>

          <div className="toolbar-container">
            <button 
              className="btn-add-product"
              onClick={() => { setProductoSeleccionado(null); setModalAbierto(true); }}
            >
              + Agregar Producto
            </button>

            <input
              type="text"
              className="search-input"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setSearchParams({ page: "1", limit: limitePorPagina });
              }}
            />

            <select
              className="category-select"
              value={categoriaSeleccionada}
              onChange={(e) => {
                setCategoriaSeleccionada(e.target.value);
                setSearchParams({ page: "1", limit: limitePorPagina });
              }}
            >
              <option value="">Todas las categorías</option>
              {categorias.map((categoria) => (
                <option key={categoria.slug} value={categoria.slug}>
                  {categoria.name}
                </option>
              ))}
            </select>
          </div>

          {cargando && (
            <div className="loading-container">
              <p>Cargando productos...</p>
            </div>
          )}

          {error && (
            <div className="error-container">
              <p>{error}</p>
            </div>
          )}

          {!cargando && !error && (
            <div className="table-responsive-box">
              <ProductTable
                productos={productosPaginados}
                onEdit={(prod) => {
                  setProductoSeleccionado(prod);
                  setModalAbierto(true);
                }}
                onDelete={handleEliminar}
              />

              <div className="paginacion-container">
                <button
                  className="btn-paginacion"
                  disabled={paginaActual === 1}
                  onClick={() => setSearchParams({ page: paginaActual - 1, limit: limitePorPagina })}
                >
                  Anterior
                </button>
                
                <span className="page-indicator">Página {paginaActual}</span>
                
                <button
                  className="btn-paginacion"
                  disabled={fin >= productosFiltrados.length}
                  onClick={() => setSearchParams({ page: paginaActual + 1, limit: limitePorPagina })}
                >
                  Siguiente
                </button>

                <select
                  className="limit-select"
                  value={limitePorPagina}
                  onChange={(e) => {
                    setSearchParams({ page: "1", limit: e.target.value });
                  }}
                >
                  <option value="10">10 registros</option>
                  <option value="20">20 registros</option>
                  <option value="40">40 registros</option>
                  <option value="50">50 registros</option>
                </select>
              </div>
            </div>
          )}
        </section>
      </main>

      {modalAbierto && (
        <ProductModal
          producto={productoSeleccionado}
          onClose={() => setModalAbierto(false)}
          onSave={handleGuardar}
        />
      )}
    </div>
  );
}

export default Dashboard;