import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import List from './pages/List'
import Create from './pages/Create'
import Update from './pages/Update'
import Sttest from './pages/Sttest'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/list" element={<List />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/sttest" element={<Sttest />} />
        <Route path="/order" element ={<Order />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
