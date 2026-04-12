import * as React from "react";
import styled from "styled-components";
import Navigation from "./Navigation";

type SidebarProps = {
  navToggle: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ navToggle }) => {
  return (
    <SidebarStyled className={`${navToggle ? "navToggle" : ""}`} id="sidebar">
      <Navigation />
    </SidebarStyled>
  );
};

const SidebarStyled = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--sidebar-dark-color);
  border-bottom: 1px solid var(--border-color);
  transition: all 0.4s ease-in-out;
  z-index: 18;

  &.navToggle {
    transform: translateY(0) !important;
  }

  @media screen and (max-width: 1200px) {
    transform: translateY(-100%);
    z-index: 20;
  }
`;

export default Sidebar;
