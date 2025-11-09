import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Login via context
    const result = await login(email.trim(), password.trim());

    if (result.success) {
      navigate('/dashboard');
    } else {
      alert(result.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '15px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>

        <label>Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}/>
        </label>

        <label>Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}/>
        </label>

        <button type="submit" style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#61dafb', cursor: 'pointer', color: '#fff', fontWeight: 'bold' }}>Login</button>
      </form>
    </div>
  );
}
