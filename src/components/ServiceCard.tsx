import * as React from 'react';
import styled from 'styled-components';

type ServiceCardProps = {
  image: string;
  title: string;
  paragraph: string;
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  title,
  paragraph,
}) => {
  return (
    <ServiceCardStyled>
      <div className='container'>
        <img src={image} alt='' />
        <h4>{title}</h4>
        <p>{paragraph}</p>
      </div>
    </ServiceCardStyled>
  );
};

const ServiceCardStyled = styled.div`
  background-color: var(--background-dark-gray);
  border-top: 8px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  border-left: 1px solid var(--border-color);
  transition: all 0.4s ease-in-out;
  &:hover {
    border-top: 8px solid var(--primary-color);
    transform: translateY(3px);
  }
  .container {
    padding: 1.2rem;
    h4 {
      color: var(--white-color);
      font-size: 1.6rem;
      padding: 1rem 0;
      position: relative;
      padding-bottom: 1rem;
      &::after {
        content: '';
        width: 4rem;
        background-color: var(--border-color);
        height: 4px;
        position: absolute;
        left: 0;
        bottom: 0;
        border-radius: 10px;
      }
    }
    p {
      padding: 0.5rem 0;
    }
  }
`;

export default ServiceCard;
