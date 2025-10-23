import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CodeEditor from './pages/CodeEditor'
import LandingPage from './pages/HomePage.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>  
        <Route path="/editor" element={<CodeEditor/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
