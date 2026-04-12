import * as React from "react";
import styled from "styled-components";
import HomePage from "./HomePage";
import ResumePage from "./ResumePage";
import PortfolioPage from "./PortfolioPage";
import ContactPage from "./ContactPage";

const SinglePage = () => {
  return (
    <SinglePageStyled>
      <SectionBlock id="home">
        <HomePage />
      </SectionBlock>

      <SectionBlock id="resume">
        <ResumePage />
      </SectionBlock>

      <SectionBlock id="portfolio">
        <PortfolioPage />
      </SectionBlock>

      <SectionBlock id="contact">
        <ContactPage />
      </SectionBlock>
    </SinglePageStyled>
  );
};

const SinglePageStyled = styled.div`
  width: 100%;
`;

const SectionBlock = styled.section`
  scroll-margin-top: 7.1rem;

  @media screen and (max-width: 1200px) {
    scroll-margin-top: 4.6rem;
  }
`;

export default SinglePage;
