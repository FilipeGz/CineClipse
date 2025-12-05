import React, { useState } from 'react';

function Login() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #111 60%, #222 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff'
    }}>
      <div style={{
        background: '#222',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 16px #0008',
        width: '320px'
      }}>
        {!showRegister ? (
          <>
            <h2 style={{ color: '#FFD700', textAlign: 'center' }}>Login</h2>
            <form>
              <div style={{ marginBottom: '1rem' }}>
                <label>Email:</label>
                <input type="email" style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: 'none', marginTop: '0.3rem' }} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Senha:</label>
                <input type="password" style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: 'none', marginTop: '0.3rem' }} />
              </div>
              <button type="submit" style={{
                width: '100%',
                background: '#FFD700',
                color: '#222',
                border: 'none',
                borderRadius: '6px',
                padding: '0.7rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>Entrar</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              Não tem conta?{' '}
              <button
                type="button"
                onClick={() => setShowRegister(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FFD700',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontWeight: 'bold'
                }}
              >
                Cadastre-se
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 style={{ color: '#FFD700', textAlign: 'center' }}>Cadastro</h2>
            <form>
              <div style={{ marginBottom: '1rem' }}>
                <label>Nome:</label>
                <input type="text" style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: 'none', marginTop: '0.3rem' }} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Email:</label>
                <input type="email" style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: 'none', marginTop: '0.3rem' }} />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Senha:</label>
                <input type="password" style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: 'none', marginTop: '0.3rem' }} />
              </div>
              <button type="submit" style={{
                width: '100%',
                background: '#FFD700',
                color: '#222',
                border: 'none',
                borderRadius: '6px',
                padding: '0.7rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>Cadastrar</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              Já tem conta?{' '}
              <button
                type="button"
                onClick={() => setShowRegister(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FFD700',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontWeight: 'bold'
                }}
              >
                Fazer login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
