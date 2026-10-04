import { createContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import authService from "../services/authService";
import { clearAuth, setToken, setUser } from "../utils/tokenManager";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [token, setTokenState] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    clearAuth();
    setIsReady(true);
  }, []);

  const login = async (payload) => {
    setIsLoading(true);
    try {
      const response = await authService.login(payload);
      const { user: nextUser, token: nextToken } = response;
      setUser(nextUser);
      setToken(nextToken);
      setUserState(nextUser);
      setTokenState(nextToken);
      toast.success("Welcome back!");
      return true;
    } catch (error) {
      const message = error?.response?.data?.message || "Unable to login";
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload) => {
    setIsLoading(true);
    try {
      const response = await authService.register(payload);
      const { user: nextUser, token: nextToken } = response;
      setUser(nextUser);
      setToken(nextToken);
      setUserState(nextUser);
      setTokenState(nextToken);
      toast.success("Account created successfully!");
      return true;
    } catch (error) {
      const message =
        error?.response?.data?.errors?.[0]?.msg ||
        error?.response?.data?.message ||
        "Unable to sign up";
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
    setUserState(null);
    setTokenState(null);
    toast.success("Logged out");
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isReady,
      isLoading,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
    }),
    [user, token, isReady, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
