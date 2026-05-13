import { useState, useEffect } from "react";
import { navLinks } from "@/data/index";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Active section tracking ── */
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.link.replace("#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    const target = document.querySelector(link);
    if (target) target.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        {/* Logo */}
        <a href="/" className="logo">
          KJ
        </a>

        {/* Desktop nav */}
        <nav className="desktop">
          <ul>
            {navLinks.map(({ name, link }) => {
              const sectionId = link.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <li key={name} className={isActive ? "active" : ""}>
                  <a href={link} onClick={(e) => handleNavClick(e, link)}>
                    {name}
                  </a>
                  <span className="nav-underline" aria-hidden="true" />
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="contact-btn"
          onClick={(e) => handleNavClick(e, "#contact")}
        >
          Get in Touch
        </a>

        {/* Hamburger (mobile only) */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2 cursor-pointer"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-px bg-white transition-all duration-300 origin-center ${
              menuOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"
            }`}
          />
          <span
            className={`block h-px bg-white transition-all duration-300 ${
              menuOpen ? "w-6 opacity-0" : "w-4"
            }`}
          />
          <span
            className={`block h-px bg-white transition-all duration-300 origin-center ${
              menuOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-6"
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } bg-black/90 backdrop-blur-xl border-t border-white/5`}
      >
        <nav className="px-6 py-5">
          <ul className="flex flex-col gap-5">
            {navLinks.map(({ name, link }) => {
              const sectionId = link.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <li key={name}>
                  <a
                    href={link}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`text-base font-medium transition-colors duration-200 ${
                      isActive ? "text-white" : "text-zinc-400"
                    }`}
                  >
                    {name}
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="inline-block mt-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-white text-black"
              >
                Get in Touch
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
