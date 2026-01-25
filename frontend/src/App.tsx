import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom'
import Home from './Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route index path='/home' element={<Home />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  )
}

export default App
