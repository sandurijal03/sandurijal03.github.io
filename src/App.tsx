import * as React from "react";
import styled from "styled-components";
import Brightness4 from "@mui/icons-material/Brightness4";
import Menu from "@mui/icons-material/Menu";
import { IconButton, Switch as MUSwitch } from "@mui/material";

import Sidebar from "./components/Sidebar";
import AppThreeBackground from "./components/AppThreeBackground";
const SinglePage = React.lazy(() => import("./pages/SinglePage"));
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

export const Main = () => {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: (
          <App>
            <React.Suspense fallback={<div>Loading...</div>}>
              <SinglePage />
            </React.Suspense>
          </App>
        ),
      },
      {
        path: "/works",
        element: <Navigate to="/#portfolio" replace />,
      },
      {
        path: "/blogs",
        element: <Navigate to="/#portfolio" replace />,
      },
      {
        path: "/resume",
        element: <Navigate to="/#resume" replace />,
      },
      {
        path: "/contact",
        element: <Navigate to="/#contact" replace />,
      },
      {
        path: "/cv",
        element: <Navigate to="/#resume" replace />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
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
    <AppShell className="App">
      <AppThreeBackground />
      <Sidebar navToggle={navToggle} onNavigate={() => setNavToggle(false)} />
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
    </AppShell>
  );
};

const AppShell = styled.div`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  isolation: isolate;
`;

const MainContentStyled = styled.main`
  position: relative;
  z-index: 1;
  margin-left: 0;
  margin-top: 6.1rem;
  min-height: 100vh;

  @media screen and (max-width: 1200px) {
    margin-top: 0;
    padding-top: 3.8rem;
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
