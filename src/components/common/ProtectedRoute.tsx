import { Navigate } from 'react-router-dom';
import { hasSession } from '../../storage';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return hasSession() ? children : <Navigate to="/login" replace />;
}
