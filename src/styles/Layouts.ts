import styled from 'styled-components';

export const MainLayout = styled.div`
  padding: 5rem;
  @media screen and (max-width: 642px) {
    padding: 2rem 4rem;
  }

  @media screen and (max-width: 571px) {
    padding: 2rem 3.4rem;
  }
`;

export const InnerLayout = styled.div`
  padding: 5rem 0;
`;
