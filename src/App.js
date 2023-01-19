import { DashboardPage } from "pages/DashboardPage";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";

import { PublicRoute } from "PublicRoute";
import { PrivateRoute } from "PrivateRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute redirectTo="/login" component={<DashboardPage />} />
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute redirectTo="/dashboard" component={<LoginPage />} />
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute
              redirectTo="/dashboard"
              component={<RegistrationPage />}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
