import { UserContext } from "@/api/context/user.context";
import { JSX, useContext } from "react";
import { Navigate } from "react-router";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { isAuth } = useContext(UserContext);
  return isAuth ? children : <Navigate to="/auth/login" />;
}
