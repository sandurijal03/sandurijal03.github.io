import * as React from 'react';
import styled from 'styled-components';

type SmallTitleProps = {
  icon: any;
  title: string;
};

const SmallTitle: React.FC<SmallTitleProps> = ({ icon, title }) => {
  return (
    <SmallTitleStyled>
      <p>{icon}</p>
      <h3>{title}</h3>
    </SmallTitleStyled>
  );
};

const SmallTitleStyled = styled.div`
  display: flex;
  align-items: center;
  p {
    padding-right: 1rem;
    svg {
      font-size: 3rem;
    }
  }
  h3 {
    color: var(--white-color);
    font-size: 2rem;
  }
`;

export default SmallTitle;
