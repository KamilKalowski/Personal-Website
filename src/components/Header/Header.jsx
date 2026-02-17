import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];

function formatKamicondaClock(date) {
  let h = date.getHours();
  const m = date.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;

  const hh = String(h).padStart(2, '0');
  const mm = String(m).padStart(2, '0');

  const mon = months[date.getMonth()];
  const day = date.getDate();

  return `${hh}:${mm}${ampm} - ${mon} ${day}, 2001`;
}

export default function Header() {
  const [clockText, setClockText] = useState(() => formatKamicondaClock(new Date()));

  useEffect(() => {
    const id = setInterval(() => setClockText(formatKamicondaClock(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <Link className="brand" to="/home">
            <span className="brand-name">KAMIL KALOWSKI</span>
          </Link>

          <nav className="nav-links">
            <Link to="/about">About</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/experience">Experience</Link>
            <Link to="/contact">Contact Me</Link>
          </nav>
        </div>

        {/* Right side: clock on top, BIOS badge below */}
        <div className="header-right">
          <div className="kamiconda-clock" aria-label="Kamiconda system clock">
            <span className="kamiconda-clock-text">{clockText}</span>
            <span className="kamiconda-clock-scan" aria-hidden="true" />
          </div>

          {/* Clickable badge -> routes to your boot screen */}
          <Link to="/" className="kamiconda-badge" aria-label="Open Kamiconda 2001 pseudo BIOS">
            <span className="kamiconda-badge-title">KAMICONDA2001 OS</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
