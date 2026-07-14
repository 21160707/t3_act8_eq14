import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";

function Dashboard({ user, setUser }) {
  return (
    <div className="dashboard">

      <Sidebar />

      <main className="main-content">

        <Navbar
          user={user}
          setUser={setUser}
        />

        <section className="content">

          <h1>Bienvenido al sistema</h1>

          <p>
            Has iniciado sesión correctamente.
          </p>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;