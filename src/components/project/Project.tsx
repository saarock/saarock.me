import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Project.css";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  github: string;
  liveDemo: string;
  details: string;
}

interface ProjectRef {
  current: HTMLDivElement[];
}

const Project: React.FC = () => {
  const projectsRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectRefs: ProjectRef = useRef([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sample project data
  const projects: Project[] = [
    {
      id: 1,
      title: "Cosmic Portfolio",
      description:
        "A personal portfolio website with a cosmic theme and animations.",
      techStack: ["React", "TypeScript", "GSAP", "CSS"],
      image: "https://via.placeholder.com/600x400.png?text=Project+1",
      github: "https://github.com",
      liveDemo: "https://example.com",
      details:
        "This portfolio showcases my skills in building responsive, animated websites using modern web technologies. Features include GSAP animations, glassmorphism, and a cosmic gradient theme.",
    },
    {
      id: 2,
      title: "Inventory App",
      description:
        "A full-stack inventory management system with real-time updates.",
      techStack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      image: "https://via.placeholder.com/600x400.png?text=Project+2",
      github: "https://github.com",
      liveDemo: "https://example.com",
      details:
        "This app allows businesses to manage stock, track inventory, and integrate barcodes. Built with a REST API, it ensures real-time data syncing and a responsive UI.",
    },
    {
      id: 3,
      title: "AI Chatbot",
      description: "An AI-powered chatbot for customer support automation.",
      techStack: ["Python", "TensorFlow", "React", "Express"],
      image: "https://via.placeholder.com/600x400.png?text=Project+3",
      github: "https://github.com",
      liveDemo: "https://example.com",
      details:
        "The chatbot leverages NLP to handle customer queries efficiently. The frontend is built with React, and the backend uses Express with TensorFlow for AI processing.",
    },
  ];

  useEffect(() => {
    // GSAP Timeline for staggered animations
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Animate title
    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
    )
      // Animate project cards
      .fromTo(
        projectRefs.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.2 },
        "-=0.5",
      );

    // Modal animation
    if (selectedProject) {
      gsap.fromTo(
        ".sb-projects-modal",
        { scale: 0.8, opacity: 0, y: 100 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" },
      );
    }

    // Cleanup
    return () => {
      tl.kill();
    };
  }, [selectedProject]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    gsap.to(".sb-projects-modal", {
      scale: 0.8,
      opacity: 0,
      y: 100,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setSelectedProject(null),
    });
  };

  return (
    <section className="sb-projects" ref={projectsRef}>
      <div className="sb-projects-overlay"></div>
      <div className="sb-projects-content">
        <h2 className="sb-projects-title" ref={titleRef}>
          My Projects
          <span className="sb-projects-title-glow"></span>
        </h2>
        <div className="sb-projects-grid">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="sb-projects-card"
              ref={(el) => {
                if (el) {
                  projectRefs.current[index] = el;
                }
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="sb-projects-card-image"
              />
              <div className="sb-projects-card-content">
                <h3 className="sb-projects-card-title">{project.title}</h3>
                <p className="sb-projects-card-description">
                  {project.description}
                </p>
                <div className="sb-projects-card-tech">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="sb-projects-card-tech-item">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="sb-projects-card-actions">
                  <a
                    href={project.github}
                    className="sb-projects-card-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                    <span className="sb-projects-link-ripple"></span>
                  </a>
                  <a
                    href={project.liveDemo}
                    className="sb-projects-card-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                    <span className="sb-projects-link-ripple"></span>
                  </a>
                  <button
                    className="sb-projects-card-button"
                    onClick={() => openModal(project)}
                  >
                    View Details
                    <span className="sb-projects-button-ripple"></span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {selectedProject && (
          <div className="sb-projects-modal-overlay" onClick={closeModal}>
            <div
              className="sb-projects-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="sb-projects-modal-close" onClick={closeModal}>
                ×
              </button>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="sb-projects-modal-image"
              />
              <h3 className="sb-projects-modal-title">
                {selectedProject.title}
              </h3>
              <p className="sb-projects-modal-description">
                {selectedProject.description}
              </p>
              <div className="sb-projects-modal-tech">
                <strong>Tech Stack:</strong>
                {selectedProject.techStack.map((tech, i) => (
                  <span key={i} className="sb-projects-modal-tech-item">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="sb-projects-modal-details">
                {selectedProject.details}
              </p>
              <div className="sb-projects-modal-actions">
                <a
                  href={selectedProject.github}
                  className="sb-projects-modal-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                  <span className="sb-projects-link-ripple"></span>
                </a>
                <a
                  href={selectedProject.liveDemo}
                  className="sb-projects-modal-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                  <span className="sb-projects-link-ripple"></span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Project;
