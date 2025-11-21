"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import "./about.css"

const About = () => {
  const aboutRef = useRef(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    })

    tl.fromTo(titleRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      .fromTo(imageRef.current, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, "-=0.5")
      .fromTo(contentRef.current, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, "-=0.8")

    if (skillsRef.current) {
      tl.fromTo(
        skillsRef.current.querySelectorAll(".sb-about-skill"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        "-=0.4",
      )
    }

    // CTA hover animation
    if (ctaRef.current) {
      ctaRef.current.addEventListener("mouseenter", () => {
        gsap.to(ctaRef.current, { scale: 1.05, duration: 0.3 })
      })
      ctaRef.current.addEventListener("mouseleave", () => {
        gsap.to(ctaRef.current, { scale: 1, duration: 0.3 })
      })
    }

    return () => {
      tl.kill()
    }
  }, [])

  const skills = [
    { category: "Frontend", items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GSAP"] },
    { category: "Backend", items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs", "JAVA", "Python"] },
    { category: "Tools", items: ["Git", "Docker", "Vercel", "Figma", "VS Code"] },
  ]

  return (
    <section className="sb-about" ref={aboutRef}>
      <div className="sb-about-overlay"></div>
      <div className="sb-about-content">
        <h1 className="sb-about-title" ref={titleRef}>
          About Me
          <span className="sb-about-title-glow"></span>
        </h1>

        <div className="sb-about-grid">
          <div className="sb-about-image-wrapper" ref={imageRef}>
            <div className="sb-about-image">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoiNzmBk9ORM0A_DtxbJc3RZX6QJm79E5SYw&s"
                alt="Saarock"
                className="sb-about-image-content"
              />
              <div className="sb-about-image-glow"></div>
              <div className="sb-about-image-border"></div>
            </div>
          </div>

          <div className="sb-about-text" ref={contentRef}>
            <h2 className="sb-about-subtitle">Full Stack Developer & Creative Technologist</h2>
            <p className="sb-about-intro">
              I'm a passionate software engineer specializing in building beautiful, performant, and scalable web
              applications. I combine design thinking with clean code to create digital experiences that matter.
            </p>

            <p className="sb-about-description">
              With expertise in modern web technologies, I've built everything from interactive portfolios to full-stack
              applications. My approach focuses on user experience, code quality, and pushing the boundaries of what's
              possible on the web.
            </p>

            <p className="sb-about-description">
              When I'm not coding, you'll find me exploring new technologies, contributing to open source, or sharing
              knowledge with the developer community. I'm always eager to learn and collaborate on exciting projects.
            </p>

            <a href="mailto:saarock4646@gmail.com" className="sb-about-cta" ref={ctaRef}>
              Get in Touch
              <span className="sb-about-cta-ripple"></span>
            </a>
          </div>
        </div>

        <div className="sb-about-skills" ref={skillsRef}>
          <h3 className="sb-about-skills-title">Skills & Expertise</h3>
          <div className="sb-about-skills-grid">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="sb-about-skill">
                <h4 className="sb-about-skill-category">{skillGroup.category}</h4>
                <div className="sb-about-skill-items">
                  {skillGroup.items.map((item, i) => (
                    <span key={i} className="sb-about-skill-item">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
