import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Loader from "./Loader";

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <Loader/>
    );

  // إذا كان المستخدم مسجلاً → نعيد توجيهه إلى الصفحة الرئيسية أو add-project
  if (user) {
    return <Navigate to="/add-project" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
