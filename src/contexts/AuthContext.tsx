import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  sessionId: string | null;
  setSessionId: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const storedSession = localStorage.getItem("session_id");
    if (storedSession) setSessionId(storedSession);
  }, []);

  return (
    <AuthContext.Provider value={{ sessionId, setSessionId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
