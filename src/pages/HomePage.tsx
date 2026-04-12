import * as React from 'react';
import styled from 'styled-components';
import Particle from '../components/Particle';
import LinkedIn from '@mui/icons-material/LinkedIn';
import Twitter from '@mui/icons-material/Twitter';
import GitHub from '@mui/icons-material/GitHub';

const HomePage = () => {
  return (
    <HomePageStyled>
      <div className='p-particles-js'>
        <Particle />
      </div>
      <div className='typography'>
        <h1>
          Hi I'm <span>Sandip Rijal</span>
        </h1>
        <p>
          I am bsc csit graduate, fullstack developer,mobile app developer, rust
          enthusiast .
        </p>
        <div className='icons'>
          <a
            href='https://www.linkedin.com/in/sanduriijal03'
            rel='noreferrer'
            className='icon i-facebook'
            target='__blank'
          >
            <LinkedIn />
          </a>
          <a
            href='https://github.com/sandurijal03'
            rel='noreferrer'
            target='_blank'
            className='icon i-github'
          >
            <GitHub />
          </a>
        </div>
      </div>
    </HomePageStyled>
  );
};

const HomePageStyled = styled.header`
  width: 100%;
  height: 100vh;
  position: relative;

  .typography {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width: 80%;

    .icons {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
      .icon {
        border: 2px solid var(--border-color);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        &:hover {
          border: 2px solid var(--primary-color);
          color: var(--primary-color);
        }

        &:not(:last-child) {
          margin-right: 1rem;
        }
        svg {
          margin: 0.5rem;
        }
      }
    }
  }
`;

export default HomePage;
