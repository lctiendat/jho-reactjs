import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import { useAuth } from "./hooks/userAuth";

export default function App(params) {
  const { user } = useAuth();
  const isLoggedIn = user !== null;

  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Contact /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  )
};
