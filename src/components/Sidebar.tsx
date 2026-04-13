import * as React from "react";
import styled from "styled-components";
import Navigation from "./Navigation";

type SidebarProps = {
  navToggle: boolean;
  onNavigate?: () => void;
  sidebarRef?: React.RefObject<HTMLDivElement | null>;
};

const Sidebar: React.FC<SidebarProps> = ({
  navToggle,
  onNavigate,
  sidebarRef,
}) => {
  return (
    <SidebarStyled
      ref={sidebarRef}
      className={`${navToggle ? "navToggle" : ""}`}
      id="sidebar"
    >
      <Navigation onNavigate={onNavigate} />
    </SidebarStyled>
  );
};

const SidebarStyled = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: transparent;
  border-bottom: 1px solid rgba(164, 172, 196, 0.2);
  backdrop-filter: none;
  box-shadow: none;
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
