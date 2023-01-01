import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Proyectos from "./components/proyectos/Proyectos";

import ProyectoState from "./context/proyectos/proyectoState";
import TareaState from "./context/tareas/tareaState";
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/autenticacion/authState";
import tokenAuth from "./config/tokenAuth";
import RutaPrivada from "./components/rutas/RutaPrivada";

//Revisar si tenemos un token
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  /*  console.log(process.env.REACT_APP_BACKEND_URL); */
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/nueva-cuenta" element={<NuevaCuenta />} />
                {/* <Route exact path="/proyectos" element={<Proyectos />} /> */}
                {/* <RutaPrivada exact path="/proyectos" element={<RutaPrivada component={Proyectos} />}/> */}
                <Route component={<RutaPrivada />}>
                  <Route exact path="/proyectos" element={<Proyectos />} />
                </Route> {/* Arreglar porque sí deja pasar */}
              </Routes>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
