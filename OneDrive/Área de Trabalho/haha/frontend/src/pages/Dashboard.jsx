import React, { useState, useEffect } from 'react';

export default function Dashboard({ api }) {
  const [stats, setStats] = useState({ membros: 0, planos: 0, treinos: 0, treinosHoje: 0 });

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    try {
      const [m, p, t] = await Promise.all([
        api.get('/api/membros'),
        api.get('/api/planos'),
        api.get('/api/treinos')
      ]);
      const hoje = new Date().toISOString().split('T')[0];
      const treinosHoje = t.data.dados.filter(tr => tr.data_treino?.startsWith(hoje)).length;
      setStats({
        membros: m.data.dados.length,
        planos: p.data.dados.length,
        treinos: t.data.dados.length,
        treinosHoje
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="stat-card">
          <h3>Total de Membros</h3>
          <p>{stats.membros}</p>
        </div>
        <div className="stat-card">
          <h3>Planos Ativos</h3>
          <p>{stats.planos}</p>
        </div>
        <div className="stat-card">
          <h3>Total de Treinos</h3>
          <p>{stats.treinos}</p>
        </div>
        <div className="stat-card">
          <h3>Treinos Hoje</h3>
          <p>{stats.treinosHoje}</p>
        </div>
      </div>
    </div>
  );
}

