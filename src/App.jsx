import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CodeEditor from './pages/CodeEditor'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/editor" element={<CodeEditor/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
