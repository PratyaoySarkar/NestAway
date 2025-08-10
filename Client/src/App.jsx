import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { UserContexProvider } from './UserContext'
import AccountPage from './pages/Account'
import PlacesPage from './pages/PlacesPaage'
import PlacesFormPage from './pages/PlacesForm'
import SinglePlace from './pages/SinglePlace'
import BookingPage from './pages/BookingsPage'
import SingleBookingPage from './pages/SingleBookingPage'

axios.defaults.baseURL = 'https://nestaway-server.onrender.com';
axios.defaults.withCredentials = true; // Enable sending cookies with requests

function App() {
  return(
    <UserContexProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/places/:id" element={<SinglePlace />} />
          <Route path="/account/bookings" element={<BookingPage />} />
          <Route path="/account/bookings/:id" element={<SingleBookingPage />} />
          
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </UserContexProvider>
  )
}

export default App
