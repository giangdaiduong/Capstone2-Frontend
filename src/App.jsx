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
import ForgotPass from './components/ForgotPass';
import ChangePass from './pages/ChangePass';
import Unauthorized from './pages/Unauthorized';
import SettingPassword from './pages/SettingPassword';
import ChatApp from './components/Chat'; 


// User Pages
import UserProfile from './pages/user/Profile';
import IdeasPage from './pages/user/IdeasPage';

// Investor Pages
import InvestorIdeasList from './pages/investor/InvestorIdeasList';
import InvestorIdeaDetail from './pages/investor/InvestorIdeaDetail';
import InvestorIdeasHistory from './pages/investor/InvestorIdeasList';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminIdeas from './pages/admin/Ideas';
import IdeaDetail from './pages/user/IdeaDetail';
import IdeaPosted from './pages/user/IdeadPosted';
import UserPostedIdeas from './pages/user/UserPostedIdeas';
import IdeaRatings from './pages/user/IdeaRatings';
import VerifyOtp from './components/VerifyOtp';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<BaseLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/change-password" element={<ChangePass />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/reset-password" element={<SettingPassword />} />
          <Route path="/chat" element={<ChatApp />} />
        </Route>

        {/* User Routes */}
        <Route
          path='user'
          element={
            // <ProtectedRoute allowedRoles={['user']}>
            <UserLayout />
            // </ProtectedRoute>
          }
        >
          <Route index  element={<IdeasPage />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/ideas/:id" element={<IdeaDetail />} />
          {/* <Route path="/user/ideas/detail" element={<IdeaDetail />} /> */}
          <Route path="/user/ideas/posted" element={<IdeaPosted />} />
          <Route path="/user/ideas/posted/detail" element={<UserPostedIdeas />} />
          <Route path="/user/ideas/posted/detail/ratings" element={<IdeaRatings />} />
        </Route>

        {/* Investor Routes */}
        <Route
          element={
            // <ProtectedRoute allowedRoles={['investor']}>
            <InvestorLayout />
            // </ProtectedRoute>
          }
        >
          <Route path="/investor/ideas" element={<InvestorIdeasList />} />
          {/* <Route path="/investor/ideas/:id" element={<InvestorIdeaDetail />} /> */}
          <Route path="/investor/ideas/detail" element={<InvestorIdeaDetail />} />
          <Route path="/investor/ideas/history" element={<InvestorIdeasHistory />} />
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
