import express from 'express'
import db from '../dataDBConnections.js'

const forumRouter = express.Router()

// ─── GET ALL CATEGORIES ──────────────────────────────────────
forumRouter.get('/categories', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM categories')
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch categories' })
  }
})

// ─── GET QUESTIONS BY CATEGORY ───────────────────────────────
forumRouter.get('/questions/:categoryId', async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT q.*, u.username 
       FROM questions q
       JOIN users u ON q.user_id = u.id
       WHERE q.category_id = ?
       ORDER BY q.created_at DESC`,
      [req.params.categoryId]
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch questions' })
  }
})

// ─── POST A NEW QUESTION ─────────────────────────────────────
forumRouter.post('/questions', async (req, res) => {
  const { title, body, user_id, category_id } = req.body
  try {
    await db.execute(
      'INSERT INTO questions (title, body, user_id, category_id) VALUES (?, ?, ?, ?)',
      [title, body, user_id, category_id]
    )
    res.json({ message: 'Question posted!' })
  } catch (err) {
    res.status(500).json({ error: 'Could not post question' })
  }
})

// ─── GET ANSWERS BY QUESTION ─────────────────────────────────
forumRouter.get('/answers/:questionId', async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT a.*, u.username 
       FROM answers a
       JOIN users u ON a.user_id = u.id
       WHERE a.question_id = ?
       ORDER BY a.created_at ASC`,
      [req.params.questionId]
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch answers' })
  }
})

export default forumRouter