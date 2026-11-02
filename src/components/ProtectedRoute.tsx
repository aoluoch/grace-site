import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  /** When true, only users with the `admin` label may access the route. */
  requireAdmin?: boolean;
  /** When true, only users with the `therapist` label may access the route. */
  requireTherapist?: boolean;
}

function FullScreenLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#202163]/20 border-t-[#202163]" />
    </div>
  );
}

function ProtectedRoute({
  children,
  requireAdmin = false,
  requireTherapist = false,
}: ProtectedRouteProps) {
  const { user, isAdmin, isTherapist, loading } = useAuth();
  const location = useLocation();

  if (loading) return <FullScreenLoader />;

  if (!user) {
    return (
      <Navigate to="/login" state={{ from: location.pathname }} replace />
    );
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to={isTherapist ? "/therapy" : "/dashboard"} replace />;
  }

  if (requireTherapist && !isTherapist) {
    return <Navigate to={isAdmin ? "/admin" : "/dashboard"} replace />;
  }

  if (!requireAdmin && !requireTherapist && isTherapist && !isAdmin) {
    return <Navigate to="/therapy" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
