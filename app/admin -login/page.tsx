'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (data.success) {
      router.push('/admin');
      router.refresh();
    } else {
      setError(data.error || 'Galat details hain');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: '#111', color: '#fff' }}>
      <form onSubmit={handleLogin} style={{ padding: '30px', background: '#222', borderRadius: '8px', width: '300px' }}>
        <h2>Admin Login</h2>
        {error && <p style={{ color: 'red', fontSize: '14px', marginTop: '10px' }}>{error}</p>}
        <div style={{ marginBottom: '15px', marginTop: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={{ width: '100%', padding: '8px', background: '#333', border: '1px solid #444', color: '#fff', borderRadius: '4px' }} 
            required 
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ width: '100%', padding: '8px', background: '#333', border: '1px solid #444', color: '#fff', borderRadius: '4px' }} 
            required 
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#f59e0b', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}>
          Login
        </button>
      </form>
    </div>
  );
}