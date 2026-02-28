import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      if (!res.ok) return setError(data.error)

      localStorage.setItem('token', data.token)
      localStorage.setItem('username', data.username)
      navigate('/dashboard')
    } catch {
      setError('Server error. Make sure your server is running.')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="neon-title">🏋️ FitLife</h1>
        <p className="neon-tagline">Your Miami Fitness Community</p>
        <h2 className="auth-subtitle">Welcome Back</h2>

        <form onSubmit={handleLogin}>
          <input
            className="neon-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            className="neon-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-msg">{error}</p>}
          <button className="neon-btn" type="submit">LOGIN</button>
        </form>

        <p className="auth-link">
          No account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login