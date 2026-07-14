import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye } from "react-icons/fa";
import api from "../services/api";
import "../styles/login.css";

function Login({ setUser }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setError("");

    try {
      const respuesta = await api.post("/auth/login", {
        username,
        password,
      });

      setUser(respuesta.data);

      navigate("/dashboard");
    } catch (error) {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="logo">

          <div className="logo-icon">
            AP
          </div>

          <h1>Admin<span>Pro</span></h1>

        </div>

        <p className="subtitle">
          Sistema de Administración Empresarial
        </p>

        <form onSubmit={login}>

          <label>Usuario</label>

          <div className="input-group">
            <FaEnvelope />
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>

          <label>Contraseña</label>

          <div className="input-group">
            <FaLock />

            <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

            <FaEye
                onClick={() => setShowPassword(!showPassword)}
                className="eye-icon"
                />
          </div>

          {error &&

          <div className="error">

            {error}

          </div>

          }

          <button>

            Entrar

          </button>

        </form>

        <a href="#">

          ¿Olvidaste tu contraseña?

        </a>

      </div>

    </div>
  );
}

export default Login;