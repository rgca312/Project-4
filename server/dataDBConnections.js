import mysql from 'mysql2/promise'

let db
try {
  db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'YOUR_PASSWORD_HERE',
    database: 'fitlife_db'
  })
  console.log('Connected to FitLife database ✅')
} catch (error) {
  console.log('Database connection error:', error)
}

export default db