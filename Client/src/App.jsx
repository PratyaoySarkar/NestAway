import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { UserContexProvider } from './UserContext'
import AccountPage from './pages/Account'

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true; // Enable sending cookies with requests

function App() {
  return(
    <UserContexProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
          <Route path="/account/:subpage?" element={<AccountPage />} />
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </UserContexProvider>
  )
}

export default App
