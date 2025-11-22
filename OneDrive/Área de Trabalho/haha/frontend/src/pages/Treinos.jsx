import React, { useState, useEffect } from 'react';

export default function Treinos({ api }) {
  const [treinos, setTreinos] = useState([]);
  const [membros, setMembros] = useState([]);
  const [modal, setModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ membro_id: '', exercicio: '', series: '', repeticoes: '', peso: '', observacoes: '', data_treino: new Date().toISOString().slice(0, 16) });

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    const [t, m] = await Promise.all([api.get('/api/treinos'), api.get('/api/membros')]);
    setTreinos(t.data.dados);
    setMembros(m.data.dados);
  };

  const abrirModal = (tr = null) => {
    setEditando(tr);
    setForm(tr ? {...tr, data_treino: tr.data_treino?.slice(0, 16) || new Date().toISOString().slice(0, 16)} : { membro_id: '', exercicio: '', series: '', repeticoes: '', peso: '', observacoes: '', data_treino: new Date().toISOString().slice(0, 16) });
    setModal(true);
  };

  const salvar = async (e) => {
    e.preventDefault();
    try {
      const dados = {...form, series: parseInt(form.series), repeticoes: parseInt(form.repeticoes), peso: form.peso ? parseFloat(form.peso) : null};
      if (editando) {
        await api.put(`/api/treinos/${editando.id}`, dados);
      } else {
        await api.post('/api/treinos', dados);
      }
      carregar();
      setModal(false);
    } catch (error) {
      alert('Erro ao salvar');
    }
  };

  const deletar = async (id) => {
    if (confirm('Deletar este treino?')) {
      await api.delete(`/api/treinos/${id}`);
      carregar();
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Treinos</h1>
        <button className="btn btn-primary" onClick={() => abrirModal()}>+ Novo Treino</button>
      </div>
      <div className="card">
        <table className="table">
          <thead>
            <tr><th>ID</th><th>Membro</th><th>Exercício</th><th>Séries</th><th>Repetições</th><th>Peso</th><th>Data</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {treinos.map(t => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.membro_nome || '-'}</td>
                <td>{t.exercicio}</td>
                <td>{t.series}</td>
                <td>{t.repeticoes}</td>
                <td>{t.peso ? `${t.peso} kg` : '-'}</td>
                <td>{new Date(t.data_treino).toLocaleString('pt-BR')}</td>
                <td>
                  <button className="btn btn-secondary" onClick={() => abrirModal(t)} style={{ marginRight: '10px', padding: '5px 10px' }}>Editar</button>
                  <button className="btn btn-danger" onClick={() => deletar(t.id)} style={{ padding: '5px 10px' }}>Deletar</button>
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
              <h2>{editando ? 'Editar Treino' : 'Novo Treino'}</h2>
              <span className="close" onClick={() => setModal(false)}>&times;</span>
            </div>
            <form onSubmit={salvar}>
              <div className="form-group">
                <label>Membro *</label>
                <select value={form.membro_id} onChange={(e) => setForm({...form, membro_id: e.target.value})} required>
                  <option value="">Selecione</option>
                  {membros.map(m => <option key={m.id} value={m.id}>{m.nome}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Exercício *</label>
                <input value={form.exercicio} onChange={(e) => setForm({...form, exercicio: e.target.value})} required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label>Séries *</label>
                  <input type="number" value={form.series} onChange={(e) => setForm({...form, series: e.target.value})} required />
                </div>
                <div className="form-group">
                  <label>Repetições *</label>
                  <input type="number" value={form.repeticoes} onChange={(e) => setForm({...form, repeticoes: e.target.value})} required />
                </div>
              </div>
              <div className="form-group">
                <label>Peso (kg)</label>
                <input type="number" step="0.5" value={form.peso} onChange={(e) => setForm({...form, peso: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Data e Hora *</label>
                <input type="datetime-local" value={form.data_treino} onChange={(e) => setForm({...form, data_treino: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Observações</label>
                <textarea value={form.observacoes} onChange={(e) => setForm({...form, observacoes: e.target.value})} rows="3" />
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

