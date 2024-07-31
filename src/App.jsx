import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/home/newHome';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/newProject/NewProject';
import './App.css';
import Container from './components/layout/Container';
import Footer from './components/layout/footer/Footer';
import NavBar from './components/layout/navBar/NavBar';
import Projects from './components/pages/Projects';
import Project from './components/pages/ProjectSolo/Project';
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Container customClass="min-height"><Home /></Container>} />
        <Route path="/projects" element={<Container customClass="min-height"><Projects /></Container>} />
        <Route path="/company" element={<Container customClass="min-height"><Company /></Container>} />
        <Route path="/contact" element={<Container customClass="min-height"><Contact /></Container>} />
        <Route path="/newproject" element={<Container customClass="min-height"><NewProject /></Container>} />
        <Route path="/project/:id" element={<Container customClass="min-height"><Project /></Container>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
