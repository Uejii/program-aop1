import React, { useState, useEffect } from 'react';

export default function Membros({ api }) {
  const [membros, setMembros] = useState([]);
  const [planos, setPlanos] = useState([]);
  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', data_nascimento: '', endereco: '', plano_id: '' });

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    const [m, p] = await Promise.all([api.get('/api/membros'), api.get('/api/planos')]);
    setMembros(m.data.dados);
    setPlanos(p.data.dados);
  };

  const abrirModal = (m = null) => {
    setEditando(m);
    setForm(m || { nome: '', email: '', telefone: '', data_nascimento: '', endereco: '', plano_id: '' });
    setModal(true);
  };

  const salvar = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await api.put(`/api/membros/${editando.id}`, form);
      } else {
        await api.post('/api/membros', form);
      }
      carregar();
      setModal(false);
    } catch (error) {
      alert('Erro ao salvar');
    }
  };

  const deletar = async (id) => {
    if (confirm('Deletar este membro?')) {
      await api.delete(`/api/membros/${id}`);
      carregar();
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Membros</h1>
        <button className="btn btn-primary" onClick={() => abrirModal()}>+ Novo Membro</button>
      </div>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th><th>Nome</th><th>Email</th><th>Telefone</th><th>Plano</th><th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {membros.map(m => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.nome}</td>
                <td>{m.email}</td>
                <td>{m.telefone}</td>
                <td>{m.plano_nome || '-'}</td>
                <td>
                  <button className="btn btn-secondary" onClick={() => abrirModal(m)} style={{ marginRight: '10px', padding: '5px 10px' }}>Editar</button>
                  <button className="btn btn-danger" onClick={() => deletar(m.id)} style={{ padding: '5px 10px' }}>Deletar</button>
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
              <h2>{editando ? 'Editar Membro' : 'Novo Membro'}</h2>
              <span className="close" onClick={() => setModal(false)}>&times;</span>
            </div>
            <form onSubmit={salvar}>
              <div className="form-group">
                <label>Nome *</label>
                <input value={form.nome} onChange={(e) => setForm({...form, nome: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Telefone *</label>
                <input value={form.telefone} onChange={(e) => setForm({...form, telefone: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Data Nascimento *</label>
                <input type="date" value={form.data_nascimento} onChange={(e) => setForm({...form, data_nascimento: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Endereço</label>
                <textarea value={form.endereco} onChange={(e) => setForm({...form, endereco: e.target.value})} rows="3" />
              </div>
              <div className="form-group">
                <label>Plano</label>
                <select value={form.plano_id} onChange={(e) => setForm({...form, plano_id: e.target.value})}>
                  <option value="">Selecione</option>
                  {planos.map(p => <option key={p.id} value={p.id}>{p.nome} - R$ {p.valor}</option>)}
                </select>
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

