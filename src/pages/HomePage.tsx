import * as React from "react";
import styled from "styled-components";
import LinkedIn from "@mui/icons-material/LinkedIn";
import GitHub from "@mui/icons-material/GitHub";

const LazySectionThreeScene = React.lazy(
  () => import("../components/SectionThreeScene"),
);

const HomePage = () => {
  const [showScene, setShowScene] = React.useState(false);

  React.useEffect(() => {
    const shouldEnableScene = window.matchMedia("(min-width: 900px)").matches;

    if (!shouldEnableScene) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setShowScene(true);
    }, 220);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <HomePageStyled>
      <HeroSceneLayer>
        {showScene ? (
          <React.Suspense fallback={null}>
            <LazySectionThreeScene variant="home" />
          </React.Suspense>
        ) : null}
      </HeroSceneLayer>
      <div className="typography">
        <h1>
          Hi I'm <span>Sandip Rijal</span>
        </h1>
        <p>
          I am bsc csit graduate, fullstack developer,mobile app developer, rust
          enthusiast .
        </p>
        <div className="icons">
          <a
            href="https://www.linkedin.com/in/sanduriijal03"
            rel="noreferrer"
            className="icon i-facebook"
            target="__blank"
          >
            <LinkedIn />
          </a>
          <a
            href="https://github.com/sandurijal03"
            rel="noreferrer"
            target="_blank"
            className="icon i-github"
          >
            <GitHub />
          </a>
        </div>
      </div>
    </HomePageStyled>
  );
};

const HomePageStyled = styled.header`
  width: 100%;
  min-height: 100vh;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(
      circle at 50% 55%,
      rgba(77, 163, 255, 0.14),
      transparent 58%
    );
    z-index: 0;
  }

  .typography {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: min(80%, 50rem);
    z-index: 2;

    p {
      margin: 0 auto;
      line-height: 1.6;
      max-width: 46rem;
    }

    .icons {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
      .icon {
        border: 2px solid var(--border-color);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        &:hover {
          border: 2px solid var(--primary-color);
          color: var(--primary-color);
        }

        &:not(:last-child) {
          margin-right: 1rem;
        }
        svg {
          margin: 0.5rem;
        }
      }
    }
  }

  @media screen and (max-width: 900px) {
    .typography {
      width: min(92%, 34rem);
    }
  }

  @media screen and (max-width: 640px) {
    min-height: calc(100vh - 3.8rem);

    .typography {
      width: 94%;

      h1 {
        font-size: 2.45rem;

        span {
          font-size: 2.45rem;
        }
      }

      p {
        font-size: 0.96rem;
      }

      .icons {
        .icon {
          border-width: 1px;

          svg {
            margin: 0.45rem;
            font-size: 1.35rem;
          }
        }
      }
    }
  }

  @media screen and (max-width: 420px) {
    .typography {
      h1 {
        font-size: 2rem;

        span {
          font-size: 2rem;
        }
      }

      p {
        font-size: 0.9rem;
      }
    }
  }
`;

const HeroSceneLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.72;
  mask-image: radial-gradient(circle at 52% 50%, black, transparent 76%);
`;

export default HomePage;
