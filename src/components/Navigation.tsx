import * as React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import avatar from "../img/dp.jpeg";

const Navigation = () => {
  return (
    <NavigationStyled>
      <div className="avatar">
        <img src={avatar} alt="" />
      </div>
      <ul className="nav-items">
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => (isActive ? "active-class" : "")}
            to="/"
          >
            Home
          </NavLink>
        </li>
        {/* <li className='nav-item'>
          <NavLink
            className={({ isActive }) => (isActive ? 'active-class' : '')}
            to='/about'
          >
            About
          </NavLink>
        </li> */}
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => (isActive ? "active-class" : "")}
            to="/resume"
          >
            Resume
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => (isActive ? "active-class" : "")}
            to="/cv"
          >
            CV
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => (isActive ? "active-class" : "")}
            to="/works"
          >
            Portfolio
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            className={({ isActive }) => (isActive ? "active-class" : "")}
            to="/contact"
          >
            Contact
          </NavLink>
        </li>
      </ul>
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

export default Navigation;
