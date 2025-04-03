import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import UserLayout from './layouts/UserLayout';
import InvestorLayout from './layouts/InvestorLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import OTPForm from './components/ForgotPass';
import ChangePass from './pages/ChangePass';
import Unauthorized from './pages/Unauthorized';

// User Pages
import UserProfile from './pages/user/Profile';
import IdeasPage from './pages/user/IdeasPage';

// Investor Pages
import InvestorDashboard from './pages/investor/Dashboard';
import InvestorProfile from './pages/investor/Profile';
import InvestorIdeas from './pages/investor/Ideas';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminIdeas from './pages/admin/Ideas';
import IdeaDetail from './pages/user/IdeaDetail';
import IdeaPosted from './pages/user/IdeadPosted';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<BaseLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<OTPForm />} />
          <Route path="/change-password" element={<ChangePass />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>

        {/* User Routes */}
        <Route
          element={
            // <ProtectedRoute allowedRoles={['user']}>
            <UserLayout />
            // </ProtectedRoute>
          }
        >
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/ideas" element={<IdeasPage />} />
          {/* <Route path="/user/ideas/:id" element={<IdeaDetail />} /> */}
          <Route path="/user/ideas/detail" element={<IdeaDetail />} />
          <Route path="/user/ideas/posted" element={<IdeaPosted />} />
        </Route>

        {/* Investor Routes */}
        <Route
          element={
            <ProtectedRoute allowedRoles={['investor']}>
              <InvestorLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/investor/dashboard" element={<InvestorDashboard />} />
          <Route path="/investor/profile" element={<InvestorProfile />} />
          <Route path="/investor/ideas" element={<InvestorIdeas />} />
        </Route>

        {/* Admin Routes */}
        <Route
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/ideas" element={<AdminIdeas />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
