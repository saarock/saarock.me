import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Footer.css";

interface SocialRef {
  current: HTMLAnchorElement[];
}

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);
  const socialRefs: SocialRef = useRef([]);
  const subscribeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // GSAP Timeline for staggered animations
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Animate title
    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
      // Animate contact section
      .fromTo(
        contactRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.5"
      )
      // Animate social section
      .fromTo(
        socialRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.4"
      )
      // Animate newsletter section
      .fromTo(
        newsletterRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.4"
      )
      // Animate copyright
      .fromTo(
        copyrightRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.3"
      )
      // Animate social icons
      .fromTo(
        socialRefs.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        "-=0.4"
      );

    // Hover animation for subscribe button
    if (subscribeButtonRef.current) {
      gsap.to(subscribeButtonRef.current, {
        scale: 1.1,
        boxShadow: "0 0 40px rgba(16, 185, 129, 1)",
        duration: 0.3,
        paused: true,
        ease: "power2.out",
      }).reverse();

      subscribeButtonRef.current.addEventListener("mouseenter", () =>
        gsap.to(subscribeButtonRef.current, { scale: 1.1, duration: 0.3 })
      );
      subscribeButtonRef.current.addEventListener("mouseleave", () =>
        gsap.to(subscribeButtonRef.current, { scale: 1, duration: 0.3 })
      );
    }

    // Cleanup
    return () => {
      tl.kill();
      if (subscribeButtonRef.current) {
        subscribeButtonRef.current.removeEventListener("mouseenter", () => {});
        subscribeButtonRef.current.removeEventListener("mouseleave", () => {});
      }
    };
  }, []);

  return (
    <footer className="sb-footer" ref={footerRef}>
      <div className="sb-footer-overlay"></div>
      <div className="sb-footer-content">
        <h2 className="sb-footer-title" ref={titleRef}>
          Connect with Me
          <span className="sb-footer-title-glow"></span>
        </h2>
        <div className="sb-footer-grid">
          <div className="sb-footer-contact" ref={contactRef}>
            <h3 className="sb-footer-subtitle">Contact Info</h3>
            <p>Email: <a href="mailto:you@example.com" className="sb-footer-link">saarock4646@gmail.com</a></p>
            <p>Phone: <a href="tel:+1234567890" className="sb-footer-link">+977 9823464648</a></p>
            <p>Location: Kathmandu Ratopul, Nepal</p>
          </div>
          <div className="sb-footer-newsletter" ref={newsletterRef}>
            <h3 className="sb-footer-subtitle">Stay Updated</h3>
            <div className="sb-footer-newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="sb-footer-newsletter-input"
              />
              <button
                className="sb-footer-newsletter-button"
                ref={subscribeButtonRef}
              >
                Subscribe
                <span className="sb-footer-button-ripple"></span>
              </button>
            </div>
          </div>
        </div>
        <div className="sb-footer-copyright" ref={copyrightRef}>
          <p>© {new Date().getFullYear()} Saarock. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;