import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const ctaPrimaryRef = useRef<HTMLAnchorElement>(null);
  const ctaSecondaryRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const socialRefs = useRef<HTMLAnchorElement[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Listen for the beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Split title into letters
  const titleText = "Welcome to My Universe";
  const titleLetters = titleText.split("").map((char, index) => (
    <span key={index} className="sb-hero-title-letter">
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  const handleInstallClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!deferredPrompt) {
      console.log('Install prompt not available yet');
      return;
    }

    deferredPrompt.prompt();

    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    setDeferredPrompt(null); // reset after prompting
  };

  return (
    <section className="sb-hero" ref={heroRef}>
      <div className="sb-hero-background" ref={bgRef}>
        <div className="sb-hero-particles" ref={particlesRef}>
          {[...Array(20)].map((_, i) => (
            <div key={i} className="sb-hero-particle"></div>
          ))}
        </div>
      </div>
      <div className="sb-hero-overlay"></div>
      <div className="sb-hero-content">
        <h1 className="sb-hero-title" ref={titleRef}>
          {titleLetters}
          <span className="sb-hero-title-glow"></span>
        </h1>
        <p className="sb-hero-subtitle" ref={subtitleRef}>
          I'm a <span className="sb-hero-typed" ref={typedRef}>Software Engineer.</span>
        </p>
        <div className="sb-hero-cta-container">
          <a
            href="#projects"
            className="sb-hero-cta sb-hero-cta-primary"
            ref={ctaPrimaryRef}
            onClick={handleInstallClick}
          >
            Download App
            <span className="sb-hero-cta-ripple"></span>
          </a>
          <a
            href="#contact"
            className="sb-hero-cta sb-hero-cta-secondary"
            ref={ctaSecondaryRef}
          >
            Get in Touch
            <span className="sb-hero-cta-ripple"></span>
          </a>
        </div>
        <div className="sb-hero-image" ref={imageRef}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoiNzmBk9ORM0A_DtxbJc3RZX6QJm79E5SYw&s"
            alt="Profile"
            className="sb-hero-image-content"
          />
          <div className="sb-hero-image-glow"></div>
        </div>

        <div className="sb-hero-socials">
          {[
            {
              name: "github",
              path: "saarock"
            },
            {
              name: "linkedin",
              path: "in/aayush-basnet-885ab9267"
            },
            {
              name: "twitter",
              path: "saarock4646",
            },
            {
              name: "instagram",
              path: "saarock_basnet"
            }
          ].map((platform, index) => (
            <a
              key={platform.name}
              href={`https://${platform.name}.com/${platform.path}`}
              className="sb-hero-social"
              ref={(el) => {
                if (el) socialRefs.current[index] = el;
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                className={`sb-hero-social-icon sb-hero-social-${platform.name}`}
              ></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
