import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";

import MainLayout from './views/MainLayout'

console.log("env.VITE_RUN_ENV =", import.meta.env.VITE_RUN_ENV);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  </React.StrictMode>
)
