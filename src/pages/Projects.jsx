import React from 'react';
import './Projects.css';

const projects = [
  {
    title: 'Monte Carlo Option Simulator (GBM)',
    stack: 'C++ · OpenMP · Plotly',
    description: 'High-throughput GBM engine with xoshiro256 RNG, antithetic + control variates, and a Plotly price-path viewer.',
  },
  {
    title: 'Kernel | Unix-Based Operating System',
    stack: 'C++ · x86 · Docker',
    description: 'Multithreaded kernel with context switching, virtual memory, RO file system, interrupts, and synchronization primitives.',
  },
  {
    title: 'Bankruptcy Risk Analyzer',
    stack: 'Python · Pandas · Scikit-Learn',
    description: 'Decision Trees, Random Forest, AdaBoost, and FFNN ensemble hitting 77% accuracy / 60% recall on bankruptcy prediction.',
  },
  {
    title: 'AArch64 System Emulator',
    stack: 'C',
    description: 'Cycle-accurate AArch64 emulator with 5-stage pipeline, full hazard controls (stall/squash/forward), and WB/WA LRU cache simulator.',
  },
  {
    title: 'Pascal Compiler',
    stack: 'C · x86',
    description: 'Lex/parse to AST, Chaitin graph-coloring register allocation, loop unrolling, and optimized x86 codegen for Pascal.',
  },
  {
    title: 'TCP Networking Stack',
    stack: 'C++',
    description: 'Implemented TCP reliability over unreliable links with Reed–Solomon + Hamming ECC, Caesar cipher, and packet filtering firewall.',
  },
  {
    title: 'Huffman Compression',
    stack: 'Java · JavaFX',
    description: 'Lossless compression UI handling jpg/png/mp3/text using canonical Huffman trees; shrinks files to ~20% of original size.',
  },
];

const Projects = () => {
  return (
    <section className="projects-page" id="projects">
      <div className="projects-overlay" />
      <div className="projects-content">
        <h1>Projects</h1>
        <p className="projects-sub">Selected builds that keep me up late.</p>
        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.title}>
              <div className="project-title">{project.title}</div>
              <div className="project-stack">{project.stack}</div>
              <p className="project-description">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
