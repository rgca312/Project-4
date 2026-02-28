import express from 'express'
import db from '../dataDBConnections.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const authRouter = express.Router()
const SECRET = 'fitlife_secret_key'

// ─── REGISTER ───────────────────────────────────────────────
authRouter.post('/register', async (req, res) => {
  const { username, password } = req.body
  try {
    const hashed = await bcrypt.hash(password, 10)
    await db.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashed]
    )
    res.json({ message: 'User registered successfully' })
  } catch (err) {
    res.status(400).json({ error: 'Username already exists' })
  }
})

// ─── LOGIN ───────────────────────────────────────────────────
authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    )
    if (!rows.length) return res.status(401).json({ error: 'Invalid credentials' })

    const match = await bcrypt.compare(password, rows[0].password)
    if (!match) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ id: rows[0].id, username }, SECRET, { expiresIn: '1d' })
    res.json({ token, username })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
})

export default authRouter