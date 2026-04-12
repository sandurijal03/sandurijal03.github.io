import * as React from 'react';
import styled from 'styled-components';

type ProgressProps = {
  title: string;
  text: string;
  width: string;
};

const Progress: React.FC<ProgressProps> = ({ title, width, text }) => {
  return (
    <ProgressStyled>
      <h6>{title}</h6>
      <div className='progressBar'>
        <p>{text}</p>
        <div className='progress'>
          <span style={{ width: width }}> </span>
        </div>
      </div>
    </ProgressStyled>
  );
};

const ProgressStyled = styled.div`
  .progressBar {
    display: flex;
    align-items: center;
    p {
      padding-right: 1.1rem;
    }
    .progress {
      position: relative;
      width: 100%;
      height: 0.4rem;
      background-color: var(--border-color);
      span {
        background-color: var(--primary-color);
        position: absolute;
        left: 0;
        bottom: 0;
        height: 100%;
      }
    }
  }
`;

export default Progress;
