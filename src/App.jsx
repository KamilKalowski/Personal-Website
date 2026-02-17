import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import Kamiconda from './pages/Kamiconda';
import Footer from './components/Footer/Footer';
import { Routes, Route, useLocation } from 'react-router-dom';
import bgHome from './assets/images/backgrounds/moon_miss.jpg';
import bgExperience from './assets/images/backgrounds/moon_high_def.jpg';
import bgProjects from './assets/images/backgrounds/interstellar.jpg';
import bgAbout from './assets/images/miscellaneous/scarface_world_is_yours.jpg';
import meAndPops from './assets/images/backgrounds/me_and_pops.jpg';

function App() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const path = location.pathname;
    let bg = '#050505';
    if (path === '/' ) {
      bg = '#050505';
    } else if (path.startsWith('/home')) {
      bg = bgHome;
    } else if (path.startsWith('/experience')) {
      bg = bgExperience;
    } else if (path.startsWith('/projects')) {
      bg = bgProjects;
    } else if (path.startsWith('/about')) {
      bg = bgAbout;
    } else if (path.startsWith('/contact')) {
      bg = meAndPops;
    }

    const bgValue = bg.startsWith('#') ? bg : `#000 url(${bg}) center / cover fixed no-repeat`;
    document.body.style.background = bgValue;
    document.body.style.color = '#fff';
    document.body.style.minHeight = '100vh';

    return () => {
      document.body.style.background = '';
    };
  }, [location.pathname]);

  return (
    <div className='App'>
      {!isLanding && <Header />}
      <div className={isLanding ? 'landing-container' : 'shared-container'}>
        <Routes>
          <Route path="/" element={<Kamiconda />} />
          <Route path="/home" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      {!isLanding && <Footer />}
    </div>
  )
}

export default App;
