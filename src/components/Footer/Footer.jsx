import React from 'react';
import './Footer.css';

import githubLogo from '../../assets/images/pngs/github.png'
import linkedinLogo from '../../assets/images/pngs/linkedin.png';
import xLogo from '../../assets/images/pngs/x.png';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer-icons">
      <a href="https://github.com/KamilKalowski" target="_blank" rel="noopener noreferrer">
          <img src={githubLogo} alt="GitHub" />
        </a>
        <a href="https://www.linkedin.com/in/kamil-kalowski-78b6211a1/" target="_blank" rel="noopener noreferrer">
          <img src={linkedinLogo} alt="LinkedIn" />
        </a>
        <a href="https://twitter.com/kamiconda" target="_blank" rel="noopener noreferrer">
          <img src={xLogo} alt="Twitter" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
