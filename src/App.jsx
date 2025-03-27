import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import OTPForm from './components/ForgotPass';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ChangePass from './pages/ChangePass';
import IdeasPage from './pages/IdeasPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<OTPForm />} />
          <Route path="/change-password" element={<ChangePass />} />
          <Route path="/ideas-page" element={<IdeasPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
