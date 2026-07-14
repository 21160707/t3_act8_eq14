import {
  FiGrid,
  FiUsers,
  FiBox,
  FiTrendingUp,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import "../styles/sidebar.css";

function Sidebar() {
  const menuItems = [
    { icon: <FiGrid />, text: "Dashboard", active: true },
    { icon: <FiUsers />, text: "Usuarios" },
    { icon: <FiBox />, text: "Productos" },
    { icon: <FiTrendingUp />, text: "Ventas" },
    { icon: <FiBarChart2 />, text: "Reportes" },
    { icon: <FiSettings />, text: "Configuración" },
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-logo">
          <div className="logo-square">
            <div className="grid">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <h2>
            Admin<span>Pro</span>
          </h2>
        </div>

        <p className="menu-title">MENÚ PRINCIPAL</p>

        <nav>
          {menuItems.map((item) => (
            <a
              href="#"
              key={item.text}
              className={item.active ? "active" : ""}
            >
              {item.icon}
              <span>{item.text}</span>

              {item.active && <div className="active-dot"></div>}
            </a>
          ))}
        </nav>
      </div>

      <button className="logout-sidebar">
        <FiLogOut />
        Cerrar sesión
      </button>
    </aside>
  );
}

export default Sidebar;