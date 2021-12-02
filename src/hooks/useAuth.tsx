import { User } from "@firebase/auth";
import { createContext, useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate} from "react-router-dom";
import { auth, SignInWithEmailAndPassword, SignInWithGoogle, signInWithEmailAndPassword, signInWithGoogle, registerWithEmailAndPassword, RegisterWithEmailAndPassword, sendPasswordResetEmail, logout, SendPasswordResetEmail, Logout } from "../firebase";

export const AuthContext = createContext<ProvideAuthHook>(undefined);
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export const ProvideAuth: React.FC = ({ children }) => {
  const authHook = useProvideAuth();
  return <AuthContext.Provider value={authHook}>{children}</AuthContext.Provider>;
}
export interface PrivateRouteProps {
    element: JSX.Element;
}
export const PrivateRoute: React.FC<PrivateRouteProps> = ({element, children}) => {
    
  const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate()
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
      }, [user, loading, navigate]);
    return (
      element
    );
  }
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(AuthContext);
};

// export type ProvideAuthHook = [
//     User | null |  undefined, 
//     Boolean, 
//     SignInWithGoogle, 
//     SignInWithEmailAndPassword,
//     RegisterWithEmailAndPassword,
//     SendPasswordResetEmail,
//     Logout,
// ] | undefined
export type ProvideAuthHook = {
    user: User | null |  undefined, 
    loading: Boolean, 
    signInWithGoogle: SignInWithGoogle, 
    signInWithEmailAndPassword: SignInWithEmailAndPassword,
    registerWithEmailAndPassword: RegisterWithEmailAndPassword,
    sendPasswordResetEmail: SendPasswordResetEmail,
    signOut: Logout,
} | undefined | null;
// Provider hook that creates auth object and handles state
export const useProvideAuth = (): ProvideAuthHook => {
    const [user, loading, error] = useAuthState(auth);

    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    
    // Return the user object and auth methods
    return {
      user,
      loading,
      signInWithGoogle,
      signInWithEmailAndPassword,
      registerWithEmailAndPassword,
      sendPasswordResetEmail,
      signOut: () => logout()
    };
  }
