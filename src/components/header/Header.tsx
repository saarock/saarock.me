import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { NavLink } from "react-router";
import "./Header.css";
import useTopLoader from "../../hooks/useTopLoader";

interface NavItem {
  name: string;
  href: string;
}

interface NavLinkRef {
  current: HTMLAnchorElement[];
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const desktopMenuRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navLinkRefs: NavLinkRef = useRef([]);
  const { width } = useTopLoader();

  useEffect(() => {
    // Handle scroll for header background
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // GSAP Animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate logo
    tl.fromTo(
      logoRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
    )
      // Animate desktop menu items
      .fromTo(
        navLinkRefs.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        "-=0.5",
      )
      // Animate mobile toggle
      .fromTo(
        mobileToggleRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6 },
        "-=0.4",
      );

    // Mobile menu animation
    if (isOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll(".sb-mobile-nav-link"),
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
      );
    }

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      tl.kill();
    };
  }, [isOpen]);

  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`sb-header ${isScrolled ? "sb-header-scrolled" : ""}`}
      ref={headerRef}
    >
      <div
        className="sb-top-loader"
        style={{
          width: `${width}px`,
          backgroundColor: "red",
          height: "1rem",
          transition: "ease-in-out",
          transitionDelay: "9s",
        }}
      ></div>
      <div className="sb-header-overlay"></div>
      <nav className="sb-nav-container">
        <div className="sb-nav-content">
          <div className="sb-logo" ref={logoRef}>
            <span className="sb-logo-text">Saarock</span>
            <div className="sb-logo-glow"></div>
          </div>

          {/* Desktop Menu */}
          <div className="sb-desktop-menu" ref={desktopMenuRef}>
            {navItems.map((item, index) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }: { isActive: Boolean }) =>
                  `sb-nav-link ${isActive ? "sb-nav-link-active" : ""}`
                }
                ref={(el: HTMLAnchorElement) => {
                  if (el) {
                    navLinkRefs.current[index] = el;
                  }
                }}
              >
                <span className="sb-nav-link-text">{item.name}</span>
                <div className="sb-nav-link-underline"></div>
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sb-mobile-toggle"
            aria-label="Toggle menu"
            ref={mobileToggleRef}
          >
            <div className={`sb-hamburger ${isOpen ? "sb-open" : ""}`}>
              <div className="sb-hamburger-line"></div>
              <div className="sb-hamburger-line"></div>
              <div className="sb-hamburger-line"></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`sb-mobile-menu ${isOpen ? "sb-mobile-menu-open" : ""}`}
          ref={mobileMenuRef}
        >
          <div className="sb-mobile-menu-content">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }: { isActive: Boolean }) =>
                  `sb-mobile-nav-link ${isActive ? "sb-mobile-nav-link-active" : ""}`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
