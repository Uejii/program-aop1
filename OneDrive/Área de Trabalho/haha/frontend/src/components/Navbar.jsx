import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ usuario, logout }) {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div>
        <Link to="/">🏋️ Academia</Link>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Dashboard</Link>
        <Link to="/membros" className={location.pathname === '/membros' ? 'active' : ''}>Membros</Link>
        <Link to="/planos" className={location.pathname === '/planos' ? 'active' : ''}>Planos</Link>
        <Link to="/treinos" className={location.pathname === '/treinos' ? 'active' : ''}>Treinos</Link>
      </div>
      <div>
        <span>Olá, {usuario.nome}</span>
        <button className="btn btn-danger" onClick={logout} style={{ marginLeft: '15px' }}>Sair</button>
      </div>
    </nav>
  );
}

