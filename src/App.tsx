import * as React from "react";
import styled from "styled-components";
import Brightness4 from "@mui/icons-material/Brightness4";
import Menu from "@mui/icons-material/Menu";
import { IconButton, Switch as MUSwitch } from "@mui/material";

import Sidebar from "./components/Sidebar";
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const BlogsPage = React.lazy(() => import("./pages/BlogsPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const PortfolioPage = React.lazy(() => import("./pages/PortfolioPage"));
const ResumePage = React.lazy(() => import("./pages/ResumePage"));
const CVPage = React.lazy(() => import("./pages/CVPage"));
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const Main = () => {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: (
          <App>
            <React.Suspense fallback={<div>Loading...</div>}>
              <HomePage />
            </React.Suspense>
          </App>
        ),
      },
      {
        path: "/works",
        element: (
          <App>
            <React.Suspense fallback={<div>Loading...</div>}>
              <PortfolioPage />
            </React.Suspense>
          </App>
        ),
      },
      {
        path: "/blogs",
        element: (
          <App>
            <React.Suspense fallback={<div>Loading...</div>}>
              <BlogsPage />
            </React.Suspense>
          </App>
        ),
      },
      {
        path: "/resume",
        element: (
          <App>
            <React.Suspense fallback={<div>Loading...</div>}>
              <ResumePage />
            </React.Suspense>
          </App>
        ),
      },
      {
        path: "/contact",
        element: (
          <App>
            <React.Suspense fallback={<div>Loading...</div>}>
              <ContactPage />
            </React.Suspense>
          </App>
        ),
      },
      {
        path: "/cv",
        element: (
          <App>
            <React.Suspense fallback={<div>Loading...</div>}>
              <CVPage />
            </React.Suspense>
          </App>
        ),
      },
      {
        path: "*",
        element: (
          <App>
            <h1>404! Page Not Found</h1>
          </App>
        ),
      },
    ],
    {
      basename: process.env.NODE_ENV === "production" ? "/" : "",
    },
  );
  return <RouterProvider router={router} />;
};

type AppProps = {
  children: React.ReactNode;
};

const App: React.FC<AppProps> = ({ children }) => {
  const [theme, setTheme] = React.useState("darkTheme");
  const [checked, setChecked] = React.useState(false);
  const [navToggle, setNavToggle] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const themeToggler = () => {
    if (theme === "lightTheme") {
      setTheme("darkTheme");
      setChecked(false);
    } else {
      setTheme("lightTheme");
      setChecked(true);
    }
  };

  return (
    <div className="App">
      <Sidebar navToggle={navToggle} />
      <div className="theme">
        <div className="lightDarkMode">
          <div className="leftContent">
            <Brightness4 />
          </div>
          <div className="rightContent">
            <MUSwitch
              value=""
              checked={checked}
              inputProps={{ "aria-label": "" }}
              size="medium"
              onClick={themeToggler}
            />
          </div>
        </div>
      </div>
      <div className="hamburgerMenu">
        <IconButton onClick={() => setNavToggle(!navToggle)}>
          <Menu />
        </IconButton>
      </div>

      <MainContentStyled>
        <div className="lines">
          <div className="line-1"></div>
          <div className="line-2"></div>
          <div className="line-3"></div>
          <div className="line-4"></div>
        </div>
        {children}
      </MainContentStyled>
    </div>
  );
};

const MainContentStyled = styled.main`
  position: relative;
  margin-left: 16.3rem;
  min-height: 100vh;

  @media screen and (max-width: 1200px) {
    margin-left: 0;
  }

  .lines {
    position: absolute;
    min-height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    opacity: 0.4;
    z-index: -1;
    .line-1,
    .line-2,
    .line-3,
    .line-4 {
      width: 1px;
      min-height: 100vh;
      background-color: var(--border-color);
    }
  }
`;

export default App;
