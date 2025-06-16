import { UserContext } from "@/api/context/user.context";
import { JSX, useContext } from "react";
import { Navigate } from "react-router";

export function PublicRoute({ children }: { children: JSX.Element }) {
  const { isAuth, user } = useContext(UserContext);
  return isAuth ? <Navigate to={`/menu/${user?.id}`} /> : children;
}
