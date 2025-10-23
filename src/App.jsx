import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CodeEditor from './pages/CodeEditor'
import LandingPage from './pages/HomePage.jsx'
import ExplainPage from './pages/ExplainPage.jsx'
import FixPage from './pages/FixPage.jsx'
import OptimizePage from './pages/OptimizePage.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>  
        <Route path="/editor" element={<CodeEditor/>}/>
        <Route path='/explain' element={<ExplainPage/>}/>
        <Route path='/fix' element={<FixPage/>}/>
        <Route path='/optimize' element={<OptimizePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
