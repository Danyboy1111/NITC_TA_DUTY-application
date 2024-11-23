import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './pages/Home';
import Profile from './components/SignupProfile';
import Dashbt from './components/Dashbt';
import Dashbs from './components/Dashbs';   
import DashAdmin from './pages/DashAdmin';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashbt" element={<Dashbt />} />
                <Route path="/dashbs" element={<Dashbs />} />
                <Route path="/map" element={<DashAdmin />} />
                
            </Routes>
        </Router>
    );
}

export default App;
