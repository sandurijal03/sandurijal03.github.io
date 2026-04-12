import * as React from "react";
import styled from "styled-components";
import avatar from "../img/dp.jpeg";

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
        href="/cv?download=1"
        target="_blank"
        rel="noreferrer"
        onClick={() => {
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
  padding: 0 1.6rem;

  .avatar {
    width: 3.25rem;
    height: 3.25rem;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid var(--border-color);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .nav-items {
    display: flex;
    align-items: center;
    gap: 0.35rem;

    .active-class {
      background-color: var(--primary-color);
      color: var(--white-color);
    }

    li {
      display: inline-flex;
      a {
        display: inline-block;
        position: relative;
        padding: 0.45rem 1rem;
        border-radius: 999px;
        z-index: 10;
        text-transform: uppercase;
        transition: all 0.4s ease-in-out;
        font-weight: 600;
        letter-spacing: 1px;
        font-size: 0.88rem;

        &:hover {
          cursor: pointer;
          color: var(--white-color);
        }
        &::before {
          content: "";
          position: absolute;
          inset: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 999px;
          background-color: var(--primary-color);
          transition: all 0.4s cubic-bezier(1, -0.2, 0.25, 0.95);
          z-index: -1;
          opacity: 0;
        }
      }
      a:hover::before {
        opacity: 0.2;
      }
    }
  }

  footer {
    border-left: 1px solid var(--border-color);
    padding-left: 1rem;
    p {
      padding: 0;
      font-size: 0.85rem;
      display: block;
      text-align: center;
      color: var(--font-light-color);
    }
  }

  @media screen and (max-width: 1200px) {
    flex-direction: column;
    align-items: stretch;
    min-height: auto;
    padding: 1.1rem 1.4rem 1.2rem;
    gap: 0.9rem;

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

      li {
        display: block;

        a {
          width: 100%;
          text-align: center;
          padding: 0.65rem 0.9rem;
          border: 1px solid var(--border-color);
          border-radius: 0.75rem;
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

const DownloadCvButton = styled.a`
  border: 1px solid var(--primary-color);
  background: linear-gradient(
    125deg,
    var(--primary-color),
    var(--primary-color-light)
  );
  color: #ffffff;
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
