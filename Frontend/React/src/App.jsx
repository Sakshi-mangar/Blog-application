import './App.css'
import { Routes, Route } from "react-router-dom"
import Register from './components/Register'
import axios from 'axios'
import Login from './components/Login'
axios.defaults.baseURL="http://localhost:3000/"
function App() {
return (
    <>
     <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
     </Routes>
    </>
  )
}

export default App
