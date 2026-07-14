import { useNavigate } from "react-router-dom";

import {
  FiSearch,
  FiBell,
  FiSliders,
  FiChevronDown
} from "react-icons/fi";

import "../styles/navbar.css";

function Navbar({ user, setUser }) {

  const navigate = useNavigate();

  const logout = () => {

    setUser(null);

    navigate("/");

  };

  return (

    <header className="navbar">

      <div className="search-container">

        <FiSearch />

        <input
          type="text"
          placeholder="Buscar en el sistema..."
        />

      </div>

      <div className="navbar-actions">

        <button className="icon-button">
          <FiBell />
        </button>

        <button className="icon-button">
          <FiSliders />
        </button>

        <div className="divider"></div>

        <div className="profile">

          <div className="avatar">

            <img
              src={user.image}
              alt={user.firstName}
            />

            <span className="online"></span>

          </div>

          <div className="profile-info">

            <h4>

              {user.firstName} {user.lastName}

            </h4>

            <span>

              Administrador

            </span>

          </div>

          <FiChevronDown className="arrow"/>

        </div>

        <button
          className="logout-button"
          onClick={logout}
        >
          Cerrar sesión
        </button>

      </div>

    </header>

  );

}

export default Navbar;