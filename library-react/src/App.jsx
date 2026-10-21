import AppLayout from './layouts/AppLayout.jsx'
import Book from './pages/Book/Book.jsx'
import { Routes, Route, Navigate } from 'react-router'
import Home from './pages/Home/Home.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<Book />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
