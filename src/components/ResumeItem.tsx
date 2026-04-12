import * as React from 'react';
import styled from 'styled-components';

type ResumeItemProps = {
  year: string;
  title: string;
  subtitle: string;
  text: string;
};

const ResumeItem: React.FC<ResumeItemProps> = ({
  year,
  title,
  subtitle,
  text,
}) => {
  return (
    <ResumeItemStyled>
      <div className='leftContent'>
        <p>{year}</p>
      </div>
      <div className='rightContent'>
        <h5>{title}</h5>
        <h6>{subtitle}</h6>
        <p>{text}</p>
      </div>
    </ResumeItemStyled>
  );
};

const ResumeItemStyled = styled.div`
  display: flex;
  transition: all 0.3s ease;

  @media screen and (max-width: 421px) {
    p,
    h5,
    h6 {
      font-size: 80%;
    }
  }

  &:not(:last-child) {
    padding-bottom: 3.5rem;
  }

  &:hover {
    .leftContent::before {
      transform: scale(1.2);
      background-color: var(--primary-color);
      box-shadow: 0 0 10px rgba(102, 126, 234, 0.4);
    }

    .rightContent {
      h5 {
        color: var(--primary-color-light);
      }
    }
  }

  .leftContent {
    width: 45%;
    padding-left: 25px;
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    &::before {
      content: '';
      position: absolute;
      left: -10px;
      top: 8px;
      height: 18px;
      width: 18px;
      border-radius: 50%;
      border: 3px solid var(--primary-color);
      background-color: var(--background-dark-color);
      transition: all 0.3s ease;
      box-shadow: 0 0 0 3px var(--background-dark-color);
    }

    p {
      display: inline-block;
      color: var(--white-color-2);
      font-weight: 500;
      font-size: 0.95em;
      margin: 0;
      padding-top: 2px;
    }
  }

  .rightContent {
    width: 55%;
    padding-left: 4rem;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 18px;
      height: 2px;
      width: 2.5rem;
      background: linear-gradient(
        90deg,
        var(--primary-color),
        var(--border-color)
      );
      transition: width 0.3s ease;
    }

    h5 {
      color: var(--primary-color);
      font-size: 1.4em;
      padding-bottom: 0.5rem;
      margin: 0;
      font-weight: 600;
      transition: color 0.3s ease;
    }

    h6 {
      padding-bottom: 0.8rem;
      font-size: 1.1em;
      margin: 0;
      color: var(--white-color);
      font-weight: 500;
    }

    p {
      color: var(--white-color-2);
      line-height: 1.5;
      margin: 0;
    }
  }

  &:hover .rightContent::before {
    width: 3.5rem;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;

    .leftContent {
      width: 100%;
      padding-left: 25px;
      margin-bottom: 1rem;
    }

    .rightContent {
      width: 100%;
      padding-left: 25px;

      &::before {
        display: none;
      }
    }
  }
`;

export default ResumeItem;
