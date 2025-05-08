import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import ResumeBuilder from "./components/ResumeBuilder";
import { useAuth } from "./hooks/useAuth";
import { logout } from "./services/auth";
import Header from "./components/Header";


function App() {
  const { user, loading, username } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F4F3]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22333B]"></div>
      </div>
    );
  }

  return (
    <Router>
      {user && <Header user={user} username={username || ''} onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <ResumeBuilder user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage onLogin={() => {}} />
            )
          }
        />
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <RegisterPage onRegister={() => {}} />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;