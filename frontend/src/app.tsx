import { Route, Routes } from "react-router";
import { Toaster } from "./components/ui/toaster";
import { HomePage } from "./pages/home-page";
import { LoginPage } from "./pages/login-page";
import { RegisterPage } from "./pages/register-page";
import { MenuPage } from "./pages/menu-page";
import { TyperGame } from "./pages/game-page";

export function App() {
  return (
    <body className="text-[#A6A6A6] bg-[#151518] font-mono">
      <main className="flex items-center justify-center h-screen p-0 m-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/game" element={<TyperGame />} />
        </Routes>
      </main>
      <Toaster />
    </body>
  );
}
