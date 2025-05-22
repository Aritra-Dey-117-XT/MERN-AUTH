import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute.jsx'
import RedirectRoute from './components/RedirectRoute.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<RedirectRoute destination="/"/>}>
          <Route path="/signin" element={<Signin />} />
        </Route>
        <Route element={<RedirectRoute destination="/"/>}>
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute/>}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}
