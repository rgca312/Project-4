import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [questions, setQuestions] = useState([])
  const username = localStorage.getItem('username')
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:4000/forum/categories')
      .then(r => r.json())
      .then(setCategories)
      .catch(err => console.log('Error loading categories:', err))
  }, [])

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat)
    fetch(`http://localhost:4000/forum/questions/${cat.id}`)
      .then(r => r.json())
      .then(setQuestions)
      .catch(err => console.log('Error loading questions:', err))
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className="dashboard">
      <header className="dash-header">
        <h1 className="neon-title">🏋️ FitLife</h1>
        <div className="user-info">
          <span>Welcome, <strong>{username}</strong></span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="dash-body">
        <aside className="category-sidebar">
          <p className="sidebar-label">CATEGORIES</p>
          {categories.map(cat => (
            <div
              key={cat.id}
              className={`category-item ${selectedCategory?.id === cat.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat.name}
            </div>
          ))}
        </aside>

        <main className="question-area">
          {!selectedCategory ? (
            <p className="placeholder-text">
              👈 Select a Category to view its questions.
            </p>
          ) : (
            <>
              <h2 className="category-title">{selectedCategory.name}</h2>
              {questions.length === 0 ? (
                <p className="placeholder-text">No questions yet. Be the first to ask!</p>
              ) : (
                questions.map(q => (
                  <div key={q.id} className="question-card">
                    <h3>{q.title}</h3>
                    <p>{q.body}</p>
                    <span className="q-meta">
                      Asked by <strong>{q.username}</strong> •{' '}
                      {new Date(q.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default Dashboard