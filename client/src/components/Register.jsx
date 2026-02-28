import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeat, setRepeat] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const validate = () => {
    const newErrors = {}
    if (!username || username.length < 3)
      newErrors.username = 'Invalid Username (min 3 characters)'
    if (!password || password.length < 8 || !/\d/.test(password))
      newErrors.password = 'Password must be 8+ chars and contain a number'
    if (password !== repeat)
      newErrors.repeat = 'The two passwords do not match'
    if (!agreed)
      newErrors.agreed = 'You must agree to the Terms and Conditions'
    return newErrors
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length) return setErrors(newErrors)

    try {
      const res = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      if (!res.ok) return setErrors({ username: data.error })
      navigate('/')
    } catch {
      setErrors({ username: 'Server error. Try again.' })
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="neon-title">🏋️ FitLife</h1>
        <h2 className="auth-subtitle">Create Account</h2>

        <form onSubmit={handleRegister}>
          <div className="field-row">
            <input
              className="neon-input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => {
                setUsername(e.target.value)
                setErrors(p => ({ ...p, username: '' }))
              }}
            />
            {errors.username && <span className="error-msg">{errors.username}</span>}
          </div>

          <div className="field-row">
            <input
              className="neon-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => {
                setPassword(e.target.value)
                setErrors(p => ({ ...p, password: '' }))
              }}
            />
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </div>

          <div className="field-row">
            <input
              className="neon-input"
              type="password"
              placeholder="Repeat Password"
              value={repeat}
              onChange={e => {
                setRepeat(e.target.value)
                setErrors(p => ({ ...p, repeat: '' }))
              }}
            />
            {errors.repeat && <span className="error-msg">{errors.repeat}</span>}
          </div>

          <div className="checkbox-row">
            <label className={errors.agreed ? 'error-label' : ''}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => {
                  setAgreed(e.target.checked)
                  setErrors(p => ({ ...p, agreed: '' }))
                }}
              />
              {' '}I agree to the Terms and Conditions and Privacy Policy
            </label>
            {errors.agreed && <span className="error-msg">{errors.agreed}</span>}
          </div>

          <button className="neon-btn" type="submit">REGISTER</button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register