import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedLayout from "./components/Auth/ProtectedLayout";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Register from "./components/Console/Register/Register";
import LoginPage from "./components/Auth/login";
import { ThemeProviderWrapper } from "./theme/ThemeProviderWrapper";
import RedirectHandler from "./components/Auth/RedirectHandler";
import List from "./components/Console/List/List";
import Dashboard from "./components/Console/Dashboard/Dashboard";
import Success from "./components/Console/Register/hook/success/success";

function App() {
  return (
    <ThemeProviderWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<RedirectHandler />} />
          <Route path="/auth" element={<LoginPage />} />
          <Route
            path="/console"
            element={<Navigate to="/console/dashboard" />}
          />
          <Route
            path="/console/*"
            element={
              <ProtectedRoute>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="list" element={<List />} />
            <Route path="register" element={<Register />} />
            <Route path="success/:id" element={<Success />} />

          </Route>

          <Route path="*" element={<Navigate to={"/auth"} />} />
        </Routes>
      </Router>
    </ThemeProviderWrapper>
  );
}

export default App;
