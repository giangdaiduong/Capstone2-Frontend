import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import UserLayout from './layouts/UserLayout';
import InvestorLayout from './layouts/InvestorLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import LayoutInvestor from './HOC/LayoutInvestor';
import LayoutDefault from './HOC/LayoutDefault';
import Dashboard from './pages/admin/Dashboard';
import AccountManagement from './pages/admin/AccountManagement';

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
import InvestorIdeasList from './pages/investor/InvestorIdeasList';
import InvestorIdeaDetail from './pages/investor/InvestorIdeaDetail';
import InvestorIdeasHistory from './pages/investor/InvestorIdeaHistory';
import ListOfIdeasPage from './pages/ListOfIdeasPage';
import History from './pages/History';
import Community from './pages/Community';
import ProfileInvestor from './pages/ProfileInvestor';
import ChatPage from './pages/ChatPage';
import SettingPage from './pages/SettingPage';
import ProfileInitiator from './pages/ProfileInitiator';

// Admin Pages
import AdminUsers from './pages/admin/Users';
import AdminIdeas from './pages/admin/Ideas';
import IdeaDetail from './pages/user/IdeaDetail';
import IdeaPosted from './pages/user/IdeadPosted';
import UserPostedIdeas from './pages/user/UserPostedIdeas';
import IdeaRatings from './pages/user/IdeaRatings';

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
        <Route element={<UserLayout />}>
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/ideas" element={<IdeasPage />} />
          <Route path="/user/ideas/posted" element={<IdeaPosted />} />
          <Route path="/user/ideas/posted/detail" element={<UserPostedIdeas />} />
          <Route path="/user/ideas/posted/detail/ratings" element={<IdeaRatings />} />
          <Route path="/initiator/profile" element={<ProfileInitiator />} />
        </Route>

        {/* Investor Routes */}
        <Route element={<InvestorLayout />}>
          <Route path="/investor/danh-sach-y-tuong" element={<ListOfIdeasPage />} />
          <Route path="/investor/idea-detail/:id" element={<InvestorIdeaDetail />} />
          <Route path="/investor/lich-su" element={<History />} />
          <Route path="/investor/cong-dong" element={<Community />} />
          <Route path="/investor/ho-so-nha-dau-tu" element={<ProfileInvestor />} />
          <Route path="/investor/chat-ai-ho-tro" element={<ChatPage />} />
          <Route path="/investor/cai-dat" element={<SettingPage />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/accounts" element={<AccountManagement />} />
          <Route path="/admin/posts/approve" element={<IdeaPosted />} />
          <Route path="/admin/posts/manage" element={<IdeaPosted />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;