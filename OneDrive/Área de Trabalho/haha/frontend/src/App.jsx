import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Membros from './pages/Membros';
import Planos from './pages/Planos';
import Treinos from './pages/Treinos';
import Navbar from './components/Navbar';
import './App.css';

const api = axios.create({ baseURL: 'http://localhost:8000' });

function App() {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem('usuario') || 'null')
  );

  const login = (user) => {
    setUsuario(user);
    localStorage.setItem('usuario', JSON.stringify(user));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
  };

  return (
    <BrowserRouter>
      <div className="app">
        {usuario && <Navbar usuario={usuario} logout={logout} />}
        <Routes>
          <Route path="/login" element={!usuario ? <Login api={api} onLogin={login} /> : <Navigate to="/" />} />
          <Route path="/" element={usuario ? <Dashboard api={api} /> : <Navigate to="/login" />} />
          <Route path="/membros" element={usuario ? <Membros api={api} /> : <Navigate to="/login" />} />
          <Route path="/planos" element={usuario ? <Planos api={api} /> : <Navigate to="/login" />} />
          <Route path="/treinos" element={usuario ? <Treinos api={api} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

