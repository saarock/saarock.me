import { useState, useEffect, useRef, JSX } from "react";
import { gsap } from "gsap";
import { NavLink } from "react-router";
import { FaHome, FaInfoCircle, FaProjectDiagram, FaBlog, FaPhoneAlt } from "react-icons/fa"; // Import the icons
import "./Header.css";


interface NavItem {
  name: string;
  href: string;
  icon: JSX.Element;  // Add icon field
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
    { name: "Home", href: "/", icon: <FaHome /> },
    { name: "About", href: "/about", icon: <FaInfoCircle /> },
    { name: "Projects", href: "/projects", icon: <FaProjectDiagram /> },
    { name: "Blogs", href: "/blogs", icon: <FaBlog /> },
    { name: "Contact", href: "/contact", icon: <FaPhoneAlt /> },
  ];

  return (
    <header
      className={`header sb-header ${isScrolled ? "sb-header-scrolled" : ""}`}
      ref={headerRef}
    >
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
                {/* <span className="sb-nav-link-icon">{item.icon}</span> */}
                <span className="sb-nav-link-text">{item.name}</span>
                <div className="sb-nav-link-underline"></div>
              </NavLink>
            ))}
          </div>
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
        
               <div className="sb-mobile-nav-details">
               <span className="sb-mobile-nav-link-icon">{item.icon}</span>
               {item.name}
               </div>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
