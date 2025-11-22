import React, { useState } from 'react';

export default function Login({ api, onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const res = await api.post('/api/login', { email, senha });
      if (res.data.sucesso) {
        onLogin(res.data.usuario);
      } else {
        setErro(res.data.mensagem);
      }
    } catch (error) {
      setErro('Erro ao conectar com o servidor');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🏋️ Sistema de Academia</h1>
        <h2>Login</h2>
        {erro && <div className="alert alert-error">{erro}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@academia.com" />
          </div>
          <div className="form-group">
            <label>Senha:</label>
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required placeholder="admin123" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Entrar</button>
        </form>
        <p style={{ marginTop: '20px', textAlign: 'center', color: '#7f8c8d', fontSize: '14px' }}>
          Usuário: admin@academia.com / admin123
        </p>
      </div>
    </div>
  );
}

