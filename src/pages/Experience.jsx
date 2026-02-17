import React from 'react';
import './Experience.css';
import amazonLogo from '../assets/images/experience_logos/amazon_logo.jpg';
import sagaLabLogo from '../assets/images/experience_logos/saga_lab.jpeg';
import arlLogo from '../assets/images/experience_logos/arl_logo.png';
import texasRoboticsLogo from '../assets/images/experience_logos/texas_robotics.jpg';

const roles = [
  {
    company: 'Amazon',
    title: 'Software Development Engineer',
    location: 'Seattle, WA',
    dates: 'Mar 2025 – Present',
    logo: amazonLogo,
    bullets: [
      'Contributing to Profit Intelligence using time-series forecasting and statistical modeling on internal ML platforms.',
    ],
  },
  {
    company: 'Amazon',
    title: 'Software Development Engineer Intern',
    location: 'Seattle, WA',
    dates: 'Jun 2024 – Aug 2024',
    logo: amazonLogo,
    bullets: [
      'Built a distributed ETS model on a 70-node EMR cluster with PySpark; improved component prediction accuracy ~20% across four continents, projecting ~$5M savings.',
      'Designed distributed training for a Temporal Fusion Transformer in PyTorch, yielding ~40% accuracy uplift and exporting deployment-ready artifacts.',
    ],
  },
  {
    company: 'Amazon',
    title: 'Software Development Engineer Intern',
    location: 'Seattle, WA',
    dates: 'Jun 2023 – Sep 2023',
    logo: amazonLogo,
    bullets: [
      'Standardized 17 dynamic rate automation schemas into a DynamoDB-backed config system, boosting developer productivity ~50% weekly.',
      'Built a simulation harness plus serverless backend (AWS Step Functions + Lambda) automating rate generation and S3/CloudFront metadata, cutting retrieval time 44%.',
    ],
  },
  {
    company: 'UT Austin – Simulation and Game Applications Lab',
    title: 'Mobile Development Intern',
    location: 'Austin, TX',
    dates: 'Jun 2022 – Aug 2022',
    logo: sagaLabLogo,
    bullets: [
      'Shipped a medical 3D-printing mobile app by integrating a C++ CuraEngine console app inside an Express API to convert CAD to printer instructions.',
      'Integrated Ultimaker + Fitbit APIs via Flask to monitor health metrics and printer connectivity.',
    ],
  },
  {
    company: 'Applied Research Laboratories',
    title: 'Software Engineer Intern',
    location: 'Austin, TX',
    dates: 'Feb 2022 – May 2022',
    logo: arlLogo,
    bullets: [
      'Contributed to a real-time satellite data map using React, D3, and Python with gRPC backends, improving data coverage 3.5%.',
      'Streamlined Jenkins CI/CD for GNSS lab, increasing reliability of automated testing and deploys.',
    ],
  },
];

const robotics = {
  title: 'LIVES: LiDAR Informed Visual Search — Robotics Simulation Work',
  link: 'https://arxiv.org/pdf/2309.14150.pdf',
  logo: texasRoboticsLogo,
  bullets: [
    'Ran large-batch Gazebo/ROS simulations to benchmark frontier-based exploration policies.',
    'Computed centroids of detected frontiers and normalized approach vectors to align robot heading.',
    'Derived quaternions for attitude control from target vectors to stabilize approach trajectories.',
    'Implemented frontier blacklisting when obstacle occupancy probability crossed thresholds, reducing wasted pathing.',
  ],
};

const Experience = () => {
  return (
    <div className="experience-page">
      <section className="experience-header">
        <h1>Work Experience</h1>
      </section>

      <section className="experience-section">
        <h2>Robotics Research</h2>
        <div className="experience-card">
          <div className="experience-content">
            <div className="experience-meta">
              <div className="role">{robotics.title}</div>
              <div className="dates-location">
                <a className="link" href={robotics.link} target="_blank" rel="noreferrer">
                  Related Research Paper
                </a>
              </div>
            </div>
            <ul>
              {robotics.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
          <img className="experience-logo" src={robotics.logo} alt="Robotics logo" />
        </div>
      </section>

      <section className="experience-section">
        <h2>Work Experience</h2>
        {roles.map((role, idx) => (
          <div className="experience-card" key={idx}>
            <div className="experience-content">
              <div className="experience-meta">
                <div>
                  <div className="role">{role.title}</div>
                  <div className="company">{role.company}</div>
                </div>
                <div className="dates-location">
                  <span>{role.dates}</span>
                  <span className="location">{role.location}</span>
                </div>
              </div>
              <ul>
                {role.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
            {role.logo && (
              <img
                className="experience-logo"
                src={role.logo}
                alt={`${role.company} logo`}
              />
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Experience;
