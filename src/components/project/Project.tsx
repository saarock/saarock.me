import type React from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Project.css";

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  githubFrontend?: string;
  githubBackend?: string;
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

  const projects: Project[] = [
    {
      id: 1,
      title: "Saarock.js",
      description: "Advanced notification library in pure JS.",
      techStack: ["JavaScript", "CSS"],
      image: "data:image/png;base64,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",
      githubFrontend: "https://github.com/saarock/saarock.js",
      details:
        "Saarock.js is a lightweight, advanced toast notification library built with pure JavaScript and CSS, with ripple effects, animations, and easy integration.",
    },
    {
      id: 2,
      title: "GoGo Todo",
      description: "Advanced Todo App like Kanban without drag & drop.",
      techStack: ["React", "Spring Boot", "JavaScript", "CSS"],
      image: "data:image/png;base64,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",
      githubFrontend: "https://github.com/saarock/gogo-todo-frontend",
      githubBackend: "https://github.com/saarock/gogo-todo-backend",
      details:
        "Full-stack advanced Todo app made using React for frontend and Spring Boot backend. Supports tasks management, categories, and a Kanban-like board without drag and drop.",
    },
    {
      id: 3,
      title: "Chime Web App",
      description: "Random video calling app using React & WebRTC.",
      techStack: ["React", "Node.js", "Socket.IO", "WebRTC", "Kafka", "Redis", "MongoDB"],
      image: "https://ik.imagekit.io/ably/ghost/prod/2021/03/socket-io-logo-1.jpeg?tr=w-1728,q-50",
      githubFrontend: "https://github.com/saarock/chime_web_app",
      githubBackend: "https://github.com/saarock/chime_backend",
      details:
        "Chime is a real-time random video call app built with React, Node.js, WebRTC, Kafka, Redis, and MongoDB. It connects users randomly for entertainment and socializing.",
    },
    {
      id: 4,
      title: "Inventory App",
      description: "Full-stack inventory management system.",
      techStack: ["React", "Node.js", "MongoDB", "Socket.IO", "Tailwind CSS"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbkTDojUnMLyYoIUw_ocYt2Wa7EUPh4mHTcBCeUpmiU-y0ZPteJzCRgMR0jObtKfsRt4k",
      githubFrontend: "https://github.com/saarock/inventory_app_front",
      githubBackend: "https://github.com/saarock/inventory_app_back",
      details:
        "A real-time inventory management app using React frontend and Node.js backend with MongoDB and Socket.IO for live updates. Built for businesses to manage stock and track products efficiently.",
    },
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    ).fromTo(
      projectRefs.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.2 },
      "-=0.5"
    );

    if (selectedProject) {
      gsap.fromTo(
        ".sb-projects-modal",
        { scale: 0.8, opacity: 0, y: 100 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
      );
    }

    return () => {
      tl.kill();
    };
  }, [selectedProject]);

  const openModal = (project: Project) => setSelectedProject(project);

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
                if (el) projectRefs.current[index] = el;
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
                  {project.githubFrontend && (
                    <a
                      href={project.githubFrontend}
                      className="sb-projects-card-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Frontend
                      <span className="sb-projects-link-ripple"></span>
                    </a>
                  )}
                  {project.githubBackend && (
                    <a
                      href={project.githubBackend}
                      className="sb-projects-card-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Backend
                      <span className="sb-projects-link-ripple"></span>
                    </a>
                  )}
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
          <div
            className="sb-projects-modal-overlay z-[99999]"
            onClick={closeModal}
          >
            <div
              className="sb-projects-modal z-[100000]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="sb-projects-modal-close"
                onClick={closeModal}
              >
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
              <p className="sb-projects-modal-details">{selectedProject.details}</p>
              <div className="sb-projects-modal-actions">
                {selectedProject.githubFrontend && (
                  <a
                    href={selectedProject.githubFrontend}
                    className="sb-projects-modal-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Frontend Code
                  </a>
                )}
                {selectedProject.githubBackend && (
                  <a
                    href={selectedProject.githubBackend}
                    className="sb-projects-modal-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Backend Code
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Project;
