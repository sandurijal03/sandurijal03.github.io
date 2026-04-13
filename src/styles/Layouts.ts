import styled from "styled-components";

export const MainLayout = styled.div`
  padding: 4.5rem 5rem;

  @media screen and (max-width: 1200px) {
    padding: 3rem 2.4rem;
  }

  @media screen and (max-width: 768px) {
    padding: 2.25rem 1.25rem;
  }

  @media screen and (max-width: 480px) {
    padding: 1.8rem 0.9rem;
  }
`;

export const InnerLayout = styled.div`
  padding: 5rem 0;

  @media screen and (max-width: 1200px) {
    padding: 3rem 0;
  }

  @media screen and (max-width: 768px) {
    padding: 2rem 0;
  }
`;
