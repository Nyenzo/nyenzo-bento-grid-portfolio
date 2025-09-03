import React, { useState } from "react";
import "../../styles/projects.css";
import "../../styles/cards.css";


import aivestorImg from "../../assets/projects/fintech.jpg";
import tradingBotImg from "../../assets/projects/trading-bot.jpg";
import tuleImg from "../../assets/projects/tule-initiative.png";
import pregnancyImg from "../../assets/projects/pregnancy-outcomes.png";
import aiPortfolioImg from "../../assets/projects/ai-portfolio.png";
import windowWeatherImg from "../../assets/projects/window-weather.png";
import myPortfolioImg from "../../assets/projects/my-portfolio.png";

const projects = [
  {
    id: 1,
    title: "AI Portfolio",
    image: aiPortfolioImg,
    description: "A showcase of AI-powered portfolio features.",
    details: "Built with React, Convex, and OpenAI. Features chat, RAG, and more.",
    tech: ["React", "Convex", "OpenAI"],
    link: "https://ai-portfolio.example.com"
  },
  {
    id: 2,
    title: "Window Weather",
    image: windowWeatherImg,
    description: "Weather app with real-time updates.",
    details: "Uses weather APIs and modern UI. Responsive and fast.",
    tech: ["React", "API", "CSS"],
    link: "https://window-weather-omega.vercel.app/"
  },
  {
    id: 3,
    title: "My Portfolio",
    image: myPortfolioImg,
    description: "Personal portfolio website.",
    details: "Modern design, project gallery, and contact form.",
    tech: ["React", "Vite", "CSS"],
    link: "https://nyenzo.github.io/nyenzo-portfolio/index.html"
  },
  {
    id: 4,
    title: "Aivestor AI",
    image: aivestorImg,
    description: "An Advanced Investment Advisory System.",
    details: "AI-powered platform for investment analysis and recommendations.",
    tech: ["Python", "Machine Learning", "React"],
    link: "https://github.com/Nyenzo/aivestor-ai"
  },
  {
    id: 5,
    title: "Algorithmic Trading Bot",
    image: tradingBotImg,
    description: "A sophisticated trading system for forex and gold markets.",
    details: "Automated trading bot with real-time analytics and execution.",
    tech: ["Python", "Trading", "API"],
    link: "https://github.com/Nyenzo/Trading-bot",
    analysis: "https://nyenzo-trading-bot-dashboard-l9vdxq.streamlit.app/"
  },
  {
    id: 6,
    title: "Tule Initiative Website",
    image: tuleImg,
    description: "A community-driven website built with Next.js.",
    details: "Modern web platform for the Tule Initiative community.",
    tech: ["Next.js", "React", "Community"],
    link: "#"
  },
  {
    id: 7,
    title: "Pregnancy Outcomes Prediction",
    image: pregnancyImg,
    description: "ML model to predict adverse pregnancy outcomes in Kenya.",
    details: "Academic project using machine learning for healthcare analytics.",
    tech: ["Python", "Machine Learning", "Healthcare"],
    link: "https://github.com/Nyenzo/ML-pregnancy-project"
  }
];

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  // Custom details for each project
  let details = null;
  if (project.title === "Aivestor AI") {
    details = (
      <>
        <p><strong>Description:</strong> AI-powered investment system combining ML, sentiment analysis, and economic indicators</p>
        <ul><strong>Key Features:</strong>
          <li>Advanced stock prediction using machine learning</li>
          <li>Real-time sentiment analysis from news and social media</li>
          <li>Economic indicator integration via FRED data</li>
          <li>Portfolio optimization based on risk tolerance</li>
          <li>RESTful API for frontend integration</li>
        </ul>
        <p><strong>Technologies:</strong> Python, scikit-learn, PyTorch, Flask, PostgreSQL</p>
        <p><strong>Impact:</strong> Provides intelligent stock market predictions and personalized portfolio recommendations</p>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginBottom: "1rem" }}>Github Repo</a>
      </>
    );
  } else if (project.title === "Algorithmic Trading Bot") {
    details = (
      <>
        <p><strong>Description:</strong> Sophisticated trading system for forex and gold markets</p>
        <ul><strong>Key Features:</strong>
          <li>Real-time data collection for multiple currency pairs (XAUUSD, GBPUSD, USDJPY, AUDUSD)</li>
          <li>Advanced technical analysis with various indicators</li>
          <li>Machine learning-based signal prediction using Random Forest</li>
          <li>Automated trading during EAT market hours</li>
          <li>Economic indicators integration</li>
          <li>Comprehensive backtesting and model evaluation</li>
        </ul>
        <p><strong>Technologies:</strong> Python, pandas, scikit-learn, yfinance, alpha_vantage</p>
        <p><strong>Achievement:</strong> Achieved over 90% accuracy in stock prediction</p>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginBottom: "0.5rem" }}>Github Repo</a>
        {project.analysis && <a href={project.analysis} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginBottom: "1rem" }}>Analysis Dashboard</a>}
      </>
    );
  } else if (project.title === "Tule Initiative Website") {
    details = (
      <>
        <p><strong>Description:</strong> Community-driven website built with Next.js</p>
        <ul><strong>Key Features:</strong>
          <li>Server-side rendering for improved SEO and performance</li>
          <li>Dynamic content integration with Firebase</li>
          <li>Responsive design with optimized images</li>
          <li>Admin dashboard functionality</li>
          <li>Consistent layout system with Navbar and Footer</li>
        </ul>
        <p><strong>Technologies:</strong> Next.js, Firebase, Font Awesome</p>
        <p><strong>Technical Highlights:</strong> Utilized Next.js's file-based routing, layout system, and Image component for optimization</p>
      </>
    );
  } else if (project.title === "Pregnancy Outcomes Prediction") {
    details = (
      <>
        <p><strong>Description:</strong> ML model to predict adverse pregnancy outcomes in Kenya</p>
        <p><strong>Duration:</strong> October 2024 - April 2025</p>
        <p><strong>Dataset:</strong> 2022 Kenya Demographic and Health Survey (KDHS)</p>
        <p><strong>Methodology:</strong> Decision tree-based machine learning model</p>
        <p><strong>Key Factors:</strong> Total pregnancies, birth intervals, education level</p>
        <p><strong>Achievement:</strong> 90.83% sensitivity in prediction</p>
        <p><strong>Impact:</strong> Provides actionable insights for maternal healthcare interventions in Kenya</p>
        <p><strong>Supervision:</strong> Dr. Barini at JKUAT</p>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginBottom: "1rem" }}>Github Repo</a>
      </>
    );
  } else {
    details = (
      <p style={{ fontSize: "1rem", marginBottom: "1rem", textAlign: "center" }}>{project.details}</p>
    );
  }
  return (
    <div className="modal-overlay" onClick={onClose} style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.6)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{
        background: "var(--surface-1)",
        borderRadius: "18px",
        padding: "2rem",
        maxWidth: "600px",
        width: "95vw",
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        color: "var(--text-1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <img src={project.image} alt={project.title} className="modal-image" style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "12px", marginBottom: "1rem" }} />
        <h2 style={{ fontSize: "1.3rem", marginBottom: "0.5rem", textAlign: "center" }}>{project.title}</h2>
        {details}
        <div className="modal-tech" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          {project.tech.map((t, i) => (
            <span key={i} className="tech-tag" style={{ background: "var(--surface-2)", borderRadius: "8px", padding: "0.3rem 0.7rem", fontSize: "0.9rem" }}>{t}</span>
          ))}
        </div>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginBottom: "1rem" }}>Visit Project</a>
        <button className="btn btn-full" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default function Works() {
  const [selected, setSelected] = useState(null);
  return (
    <div className="works-page" style={{ padding: "2rem 1rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 className="works-title" style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "center" }}>Works Gallery</h1>
      <div className="project-thumbnails" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem", justifyItems: "center" }}>
        {projects.map(project => (
          <div key={project.id} className="project-thumbnail" style={{ width: "100%", maxWidth: "340px", height: "320px", borderRadius: "16px", background: "var(--surface-2)", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", cursor: "pointer", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", padding: 0, justifyContent: "flex-start" }} onClick={() => setSelected(project)}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--text-1)", margin: "1rem 0 0.5rem 0", textAlign: "center" }}>{project.title}</h3>
            <img src={project.image} alt={project.title} className="project-image" style={{ width: "100%", height: "240px", objectFit: "cover", borderRadius: "12px", display: "block" }} />
          </div>
        ))}
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

// Add modal styles to projects.css or a new modal.css for best results.
