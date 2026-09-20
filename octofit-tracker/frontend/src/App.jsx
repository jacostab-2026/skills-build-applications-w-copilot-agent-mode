import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import { apiBaseUrl, isCodespaceApiConfigured } from './api'
import './App.css'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/users" aria-label="Octofit Tracker home">
          <img src={logo} alt="Octofit Tracker" />
          <div>
            <span>Octofit Tracker</span>
            <strong>Training intelligence</strong>
          </div>
        </NavLink>

        <nav className="nav nav-pills" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink className="nav-link" key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      {!isCodespaceApiConfigured && (
        <div className="api-warning" role="status">
          VITE_CODESPACE_NAME is unset. Using local API fallback: <code>{apiBaseUrl}</code>
        </div>
      )}

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
