import { Route, Routes } from "react-router";
import { HomePage } from "./pages/home-page";
import { LoginPage } from "./pages/login-page";
import { RegisterPage } from "./pages/register-page";
import { MenuPage } from "./pages/menu-page";
import { TyperGame } from "./pages/game-page";
import { UserProvider } from "./api/context/user.context";
import { Toaster } from "sonner";
import { PublicRoute } from "./components/publicRoute";
import { PrivateRoute } from "./components/privateRoute";

export function App() {
  return (
    <UserProvider>
      <main className="flex items-center justify-center h-screen p-0 m-0">
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <HomePage />
              </PublicRoute>
            }
          />
          <Route
            path="/auth/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/auth/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/menu/:id"
            element={
              <PrivateRoute>
                <MenuPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/game/:id"
            element={
              <PrivateRoute>
                <TyperGame />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Toaster />
    </UserProvider>
  );
}
