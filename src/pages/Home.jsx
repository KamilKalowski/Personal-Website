import React from 'react';
import './Home.css';

const learning = [
  'Alignment tax & evals for frontier models',
  'Systems for low-latency inference (vLLM/FlashAttention)'
];

const HomePage = () => {
  return (
    <div className='home-container'>
      <div className="text-content hero-panel">
        <h1>Hello World? AI Slop? Agentic Terminator? </h1>
        <p>Welcome to my digital slice of the soon to be dead internet (or already, depends on when you were lucky enough to find your way here)</p>
        <p>Time might just be a flat circle</p>
      </div>

      <div className="tech-section">
        <h2>I'm currently learning about</h2>
        <div className="cards-container">
          {learning.map((item) => (
            <div className="card hero-panel" key={item}>
              <div className="title">{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
