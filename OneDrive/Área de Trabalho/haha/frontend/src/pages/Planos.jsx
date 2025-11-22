import React, { useState, useEffect } from 'react';

export default function Planos({ api }) {
  const [planos, setPlanos] = useState([]);
  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ nome: '', valor: '', descricao: '' });

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    const res = await api.get('/api/planos');
    setPlanos(res.data.dados);
  };

  const abrirModal = (p = null) => {
    setEditando(p);
    setForm(p || { nome: '', valor: '', descricao: '' });
    setModal(true);
  };

  const salvar = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await api.put(`/api/planos/${editando.id}`, form);
      } else {
        await api.post('/api/planos', form);
      }
      carregar();
      setModal(false);
    } catch (error) {
      alert('Erro ao salvar');
    }
  };

  const deletar = async (id) => {
    if (confirm('Deletar este plano?')) {
      await api.delete(`/api/planos/${id}`);
      carregar();
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Planos</h1>
        <button className="btn btn-primary" onClick={() => abrirModal()}>+ Novo Plano</button>
      </div>
      <div className="card">
        <table className="table">
          <thead>
            <tr><th>ID</th><th>Nome</th><th>Valor</th><th>Descrição</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {planos.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nome}</td>
                <td>R$ {parseFloat(p.valor).toFixed(2)}</td>
                <td>{p.descricao || '-'}</td>
                <td>
                  <button className="btn btn-secondary" onClick={() => abrirModal(p)} style={{ marginRight: '10px', padding: '5px 10px' }}>Editar</button>
                  <button className="btn btn-danger" onClick={() => deletar(p.id)} style={{ padding: '5px 10px' }}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <div className="modal" onClick={() => setModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editando ? 'Editar Plano' : 'Novo Plano'}</h2>
              <span className="close" onClick={() => setModal(false)}>&times;</span>
            </div>
            <form onSubmit={salvar}>
              <div className="form-group">
                <label>Nome *</label>
                <input value={form.nome} onChange={(e) => setForm({...form, nome: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Valor (R$) *</label>
                <input type="number" step="0.01" value={form.valor} onChange={(e) => setForm({...form, valor: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <textarea value={form.descricao} onChange={(e) => setForm({...form, descricao: e.target.value})} rows="3" />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

