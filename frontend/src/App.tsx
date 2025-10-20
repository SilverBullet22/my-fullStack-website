// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Search from './pages/Search';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProjectDetails from './pages/ProjectDetails';
import AddProject from './pages/AddProject';
import { ProjectsProvider } from './contexts/ProjectsContext';

import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Footer from './components/Footer';
import { ToastProvider } from './contexts/Toast';
import ProjectsList from './pages/ProjectsList';
import EditProject from './pages/EditProject';
import ManageMetaData from './pages/ManageMetaData';
import { useEffect } from 'react';

function App() {

  const useThemeColor = (color: string) => {
    useEffect(() => {
      let meta = document.querySelector('meta[name="theme-color"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "theme-color");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", color);
    }, [color]);
  };

  useThemeColor("#059669")
  return (
    <ThemeProvider>
      <ProjectsProvider>
          <ToastProvider>
            <Navigation/>
            <Routes>
              <Route path="/" element={<><Home /> <Footer/></>} />
              <Route path="/about" element={<><About /> <Footer/></>} />
              <Route path="/projects" element={<><Projects/> <Footer/></>} />
              <Route path="/project/:id" element={<><ProjectDetails /> <Footer/></>} />
              <Route path="/contact" element={<><Contact /> <Footer/></>} />
              <Route path="/search" element={<><Search /> <Footer/></>} />
              

              <Route
                path="/login" 
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                  } />

              <Route
                path="/signup" 
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                  } />

              <Route
                path="/add-project"
                element={
                  <ProtectedRoute>
                    <AddProject />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/projects-list"
                element={
                  <ProtectedRoute>
                    <ProjectsList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-project/:id"
                element={
                  <ProtectedRoute>
                    <EditProject />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manage-metadata"
                element={
                  <ProtectedRoute>
                    <ManageMetaData />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </ToastProvider>
      </ProjectsProvider>
    </ThemeProvider>
  );
}



export default App;