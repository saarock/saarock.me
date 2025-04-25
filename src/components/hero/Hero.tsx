import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Hero.css";

interface SocialRef {
    current: HTMLAnchorElement[]
}

const Hero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const typedRef = useRef<HTMLSpanElement>(null);
    const ctaPrimaryRef = useRef<HTMLAnchorElement>(null);
    const ctaSecondaryRef = useRef<HTMLAnchorElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const socialRefs: SocialRef = useRef([]);
    const particlesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // GSAP Timeline for staggered animations
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Split title into letters for staggered animation
        const titleLetters = titleRef.current?.querySelectorAll(".sb-hero-title-letter");
        if (titleLetters) {
            tl.fromTo(
                titleLetters,
                { y: 120, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.05 }
            );
        }

        // Animate subtitle
        tl.fromTo(
            subtitleRef.current,
            { y: 80, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7 },
            "-=0.5"
        )
            // Animate typed text
            .fromTo(
                typedRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.6 },
                "-=0.4"
            )
            // Animate primary CTA
            .fromTo(
                ctaPrimaryRef.current,
                { y: 60, opacity: 0, scale: 0.8 },
                { y: 0, opacity: 1, scale: 1, duration: 0.6 },
                "-=0.4"
            )
            // Animate secondary CTA
            .fromTo(
                ctaSecondaryRef.current,
                { y: 60, opacity: 0, scale: 0.8 },
                { y: 0, opacity: 1, scale: 1, duration: 0.6 },
                "-=0.3"
            )
            // Animate image with 3D tilt
            .fromTo(
                imageRef.current,
                { y: 100, opacity: 0, rotationX: -20 },
                { y: 0, opacity: 1, rotationX: 0, duration: 1 },
                "-=0.5"
            )
            // Animate social icons
            .fromTo(
                socialRefs.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
                "-=0.4"
            );

        // Text cycling for subtitle
        const words = ["Engineer", "Developer", "Innovator", "Creator"];
        let currentWord = 0;
        const cycleText = () => {
            if (typedRef.current) {
                gsap.to(typedRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 0.3,
                    onComplete: () => {
                        if (typedRef.current) {
                            typedRef.current.textContent = words[currentWord];
                            gsap.to(typedRef.current, {
                                opacity: 1,
                                y: 0,
                                duration: 0.3,
                            });
                        }
                        currentWord = (currentWord + 1) % words.length;
                    },
                });
            }
        };
        cycleText();
        const textInterval = setInterval(cycleText, 3000);

        // Parallax background on scroll
        const handleScroll = () => {
            if (bgRef.current) {
                const scrollY = window.scrollY;
                gsap.to(bgRef.current, {
                    y: scrollY * 0.5,
                    duration: 0.6,
                    ease: "power2.out",
                });
            }
        };
        window.addEventListener("scroll", handleScroll);

        // Floating and tilting animation for image
        gsap.to(imageRef.current, {
            y: -30,
            rotation: 3,
            rotationX: 5,
            rotationY: 5,
            repeat: -1,
            yoyo: true,
            duration: 4,
            ease: "sine.inOut",
        });

        // Particle animation
        const particles = particlesRef.current?.querySelectorAll(".sb-hero-particle");
        if (particles) {
            particles.forEach((particle, index) => {
                gsap.to(particle, {
                    x: () => Math.random() * 100 - 50,
                    y: () => Math.random() * 100 - 50,
                    scale: () => Math.random() * 0.5 + 0.5,
                    opacity: () => Math.random() * 0.3 + 0.2,
                    duration: () => Math.random() * 3 + 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: index * 0.1,
                });
            });
        }

        // Cleanup
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearInterval(textInterval);
            tl.kill();
        };
    }, []);

    // Split title into letters
    const titleText = "Welcome to My Universe";
    const titleLetters = titleText.split("").map((char, index) => (
        <span key={index} className="sb-hero-title-letter">
            {char === " " ? "\u00A0" : char}
        </span>
    ));

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
                    I'm a <span className="sb-hero-typed" ref={typedRef}></span>
                </p>
                <div className="sb-hero-cta-container">
                    <a
                        href="#projects"
                        className="sb-hero-cta sb-hero-cta-primary"
                        ref={ctaPrimaryRef}
                    >
                        Explore My Work
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
                    {["github", "linkedin", "twitter", "instagram"].map((platform, index) => (
                        <a
                            key={platform}
                            href={`https://${platform}.com`}
                            className="sb-hero-social"
                            ref={(el) => {
                                if (el) socialRefs.current[index] = el;
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className={`sb-hero-social-icon sb-hero-social-${platform}`}></span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;