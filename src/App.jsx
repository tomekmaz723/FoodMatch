import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AuthLoginPage from './pages/AuthLoginPage';
import SignupPage from './pages/SignupPage';
import LobbyPage from './pages/LobbyPage';
import JoinRoomPage from './pages/JoinRoomPage';
import SwipePage from './pages/SwipePage';
import MatchResultPage from './pages/MatchResultPage';
import NoMatchPage from './pages/NoMatchPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import HistoryPage from './pages/HistoryPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Auth & Landing */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/auth/login" element={<AuthLoginPage />} />
      <Route path="/auth/signup" element={<SignupPage />} />
      
      {/* Core Flow */}
      <Route path="/lobby" element={<LobbyPage isHost />} />
      <Route path="/join" element={<JoinRoomPage />} />
      <Route path="/waiting" element={<LobbyPage isParticipant />} />
      <Route path="/swipe" element={<SwipePage />} />
      <Route path="/result" element={<MatchResultPage />} />
      <Route path="/nomatch" element={<NoMatchPage />} />
      <Route path="/restaurant" element={<RestaurantDetailPage />} />
      
      {/* User Pages */}
      <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />

      {/* Fallback 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
