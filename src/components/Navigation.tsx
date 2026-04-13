import * as React from "react";
import styled from "styled-components";
import avatar from "../img/dp.jpeg";
import { downloadCvPdf } from "../utils/downloadCvPdf";

type NavigationProps = {
  onNavigate?: () => void;
};

const sections = [
  { id: "home", label: "Home" },
  { id: "resume", label: "Resume" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [activeHash, setActiveHash] = React.useState(
    window.location.hash || "#home",
  );

  React.useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || "#home");
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  React.useEffect(() => {
    const updateActiveFromScroll = () => {
      if (window.location.pathname !== "/") {
        return;
      }

      const topOffset = window.innerWidth <= 1200 ? 95 : 128;
      let currentSectionId = "home";

      for (const section of sections) {
        const element = document.getElementById(section.id);

        if (!element) {
          continue;
        }

        const { top } = element.getBoundingClientRect();

        if (top - topOffset <= 0) {
          currentSectionId = section.id;
        }
      }

      const nextHash = `#${currentSectionId}`;

      setActiveHash((previousHash) =>
        previousHash === nextHash ? previousHash : nextHash,
      );

      if (window.location.hash !== nextHash) {
        window.history.replaceState(null, "", `/${nextHash}`);
      }
    };

    let ticking = false;

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        updateActiveFromScroll();
        ticking = false;
      });
    };

    updateActiveFromScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleLinkClick = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `/#${sectionId}`);
      setActiveHash(`#${sectionId}`);
    }

    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <NavigationStyled>
      <div className="avatar">
        <img src={avatar} alt="" />
      </div>
      <ul className="nav-items">
        {sections.map((section) => (
          <li className="nav-item" key={section.id}>
            <a
              className={activeHash === `#${section.id}` ? "active-class" : ""}
              href={`/#${section.id}`}
              onClick={(event) => {
                event.preventDefault();
                handleLinkClick(section.id);
              }}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
      <DownloadCvButton
        type="button"
        onClick={() => {
          downloadCvPdf();
          if (onNavigate) {
            onNavigate();
          }
        }}
      >
        Download CV
      </DownloadCvButton>
      <footer className="footer">
        <p>@{new Date().getFullYear()} My Portfolio</p>
      </footer>
    </NavigationStyled>
  );
};

const NavigationStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  min-height: 6.1rem;
  width: 100%;
  padding: 0.78rem 1.6rem;
  gap: 0.95rem;
  background: transparent;
  backdrop-filter: none;

  .avatar {
    width: 3.45rem;
    height: 3.45rem;
    padding: 2px;
    background: linear-gradient(
      140deg,
      var(--primary-color-light),
      rgba(77, 163, 255, 0.25)
    );
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid rgba(77, 163, 255, 0.45);
    box-shadow: 0 0 0 3px rgba(77, 163, 255, 0.13);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .nav-items {
    display: flex;
    align-items: center;
    gap: 0.42rem;
    background: rgba(127, 145, 180, 0.12);
    border: 1px solid rgba(164, 172, 196, 0.24);
    border-radius: 999px;
    padding: 0.32rem;

    .active-class {
      background: linear-gradient(
        120deg,
        var(--primary-color),
        var(--primary-color-light)
      );
      color: var(--white-color);
      box-shadow: 0 7px 16px rgba(77, 163, 255, 0.3);

      &::before {
        opacity: 0 !important;
      }

      &::after {
        transform: scaleX(1) !important;
        opacity: 0.88 !important;
      }
    }

    li {
      display: inline-flex;

      a {
        display: inline-block;
        position: relative;
        padding: 0.52rem 0.95rem;
        min-width: 6.2rem;
        text-align: center;
        border-radius: 999px;
        z-index: 10;
        text-transform: uppercase;
        transition: all 0.28s ease-in-out;
        font-weight: 600;
        letter-spacing: 0.09rem;
        font-size: 0.78rem;
        color: var(--font-light-color);

        &:hover {
          cursor: pointer;
          color: var(--white-color);
          transform: translateY(-1px);
        }

        &::before {
          content: "";
          position: absolute;
          inset: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 999px;
          background-color: rgba(77, 163, 255, 0.24);
          transition: all 0.3s cubic-bezier(1, -0.2, 0.25, 0.95);
          z-index: -1;
          opacity: 0;
        }

        &::after {
          content: "";
          position: absolute;
          left: 22%;
          right: 22%;
          bottom: 6px;
          height: 2px;
          border-radius: 999px;
          background: rgba(221, 239, 255, 0.95);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.25s ease;
          opacity: 0.5;
        }
      }

      a:hover::before {
        opacity: 1;
      }

      a:hover::after {
        transform: scaleX(0.95);
      }
    }
  }

  footer {
    border-left: 1px solid rgba(164, 172, 196, 0.2);
    padding-left: 0.95rem;

    p {
      padding: 0;
      font-size: 0.74rem;
      letter-spacing: 0.03rem;
      display: block;
      text-align: center;
      color: var(--font-light-color);
    }
  }

  @media screen and (max-width: 1200px) {
    flex-direction: column;
    align-items: stretch;
    min-height: auto;
    padding: 1.05rem 1.2rem 1.2rem;
    gap: 0.9rem;
    border-radius: 0 0 1rem 1rem;

    .avatar {
      margin: 0 auto;
      width: 3.9rem;
      height: 3.9rem;
    }

    .nav-items {
      width: 100%;
      flex-direction: column;
      align-items: stretch;
      gap: 0.5rem;
      border-radius: 0.95rem;
      padding: 0.55rem;

      li {
        display: block;

        a {
          width: 100%;
          text-align: center;
          min-width: 0;
          padding: 0.68rem 0.9rem;
          border: 1px solid rgba(164, 172, 196, 0.32);
          border-radius: 0.75rem;

          &::after {
            left: 35%;
            right: 35%;
            bottom: 8px;
          }
        }
      }
    }

    footer {
      border-left: none;
      border-top: 1px solid var(--border-color);
      padding-left: 0;
      padding-top: 0.8rem;

      p {
        font-size: 0.82rem;
      }
    }
  }
`;

const DownloadCvButton = styled.button`
  border: 1px solid var(--primary-color);
  background: linear-gradient(
    125deg,
    var(--primary-color),
    var(--primary-color-light)
  );
  color: #ffffff;
  cursor: pointer;
  font-family: inherit;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  font-size: 0.76rem;
  font-weight: 700;
  border-radius: 999px;
  padding: 0.52rem 0.95rem;
  transition:
    transform 0.2s ease,
    filter 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.06);
  }

  @media screen and (max-width: 1200px) {
    text-align: center;
    border-radius: 0.75rem;
    padding: 0.65rem 0.9rem;
  }
`;

export default Navigation;
