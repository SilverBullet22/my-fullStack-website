// src/context/ProjectsContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase"; 

interface Project {
  featured: boolean;
  id?: string;
  title: string;
  description: string;
  image?: string;
  category?: string;
  features?: string[];
  technologies?: string[];
  tags?: string[];
  live_url?: string;
  github_url?: string;
  duration?: string;
  date?: string;
  role?: string;
  images?: string[];
  createdAt?: any;
}
interface Metadata {
  tags: string[];
  technologies: string[];
  categories: string[];
  cv:any
}
interface ProjectsContextType {
  projects: Project[];
  metadata: Metadata;
  loading: boolean;
  fetchProjects: () => Promise<void>;
  getProjectById: (id: string) => Promise<Project | null>;
  addProject: (data: Project) => Promise<boolean>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  fetchMetadata: () => Promise<void>;
  saveMetadata: (data: Metadata) => Promise<void>;
}



const ProjectsContext = createContext<ProjectsContextType | null>(null);

export const ProjectsProvider = ({ children }: { children: React.ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [metadata, setMetadata] = useState<Metadata>({ tags: [], technologies: [], categories: [], cv: null });

  // 🟢 جلب كل المشاريع
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[];
      setProjects(data);
    } catch (error) {
      console.error("خطأ أثناء جلب المشاريع:", error);
    } finally {
      setLoading(false);
    }
  };


   const fetchMetadata = async () => {
    try {
      const docRef = doc(db, "config", "metadata");
      const snap = await getDoc(docRef);
      if (snap.exists()) setMetadata(snap.data() as Metadata);
    } catch (err) {
      console.error("خطأ جلب metadata:", err);
    }
  };

  // 🟢 جلب مشروع واحد
  const getProjectById = async (id: string): Promise<Project | null> => {
    try {
      const docRef = doc(db, "projects", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Project;
      }
      return null;
    } catch (error) {
      console.error("خطأ أثناء جلب المشروع:", error);
      return null;
    }
  };

  const addProject = async (data: Project) => {
    try {
      await addDoc(collection(db, "projects"), {
        ...data,
        createdAt: serverTimestamp(),
      });
      await fetchProjects(); 
      return true
    } catch (error) {
      console.error("خطأ أثناء إضافة المشروع:", error);
      return false

    }
  };

  const updateProject = async (id: string, data: Partial<Project>) => {
    try {
      const docRef = doc(db, "projects", id);
      await updateDoc(docRef, data);
      await fetchProjects();
    } catch (error) {
      console.error("خطأ أثناء تحديث المشروع:", error);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await deleteDoc(doc(db, "projects", id));
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("خطأ أثناء حذف المشروع:", error);
    }
  };

   const saveMetadata = async (data: Metadata) => {
    try {
      await setDoc(doc(db, "config", "metadata"), data);
      setMetadata(data);
    } catch (err) {
      console.error("خطأ حفظ metadata:", err);
    }
  };

  // جلب البيانات عند التحميل لأول مرة
  useEffect(() => {
    fetchProjects();
    fetchMetadata()
  }, []);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        metadata,
        loading,
        fetchProjects,
        getProjectById,
        addProject,
        updateProject,
        deleteProject,
        fetchMetadata,
        saveMetadata
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) throw new Error("useProjects يجب أن يُستخدم داخل ProjectsProvider");
  return context;
};
