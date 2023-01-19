import { DashboardPage } from "pages/DashboardPage";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";

import { PublicRoute } from "PublicRoute";
import { PrivateRoute } from "PrivateRoute";
import HomeTab from "components/HomeTab/HomeTab";
import DiagramTab from "components/DiagramTab/DiagramTab";
import Currency from "components/Currency/Currency";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
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
        <Route
          path="/dashboard"
          element={
            <PrivateRoute redirectTo="/login" component={<DashboardPage />} />
          }
        >
          <Route index element={<HomeTab />} />
          <Route path="statistics" element={<DiagramTab />} />
          <Route path="currency" element={<Currency />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
