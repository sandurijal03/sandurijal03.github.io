import * as React from 'react';
import styled from 'styled-components';
import resume from '../img/main.jpg';
import cv from '../img/sandip_rijal_cv.pdf';

const ImageSection = () => {
  return (
    <ImageSectionStyled>
      <div className='leftContent'>
        <img src={resume} alt='' />
      </div>
      <div className='rightContent'>
        <h4>
          I am <span>Sandy</span>
        </h4>
        <p className='paragraph'>
          A fullstack developer proficiency in javascript/rust technologies.
        </p>
        <div className='aboutInfo'>
          <div className='infoTitle'>
            <p>Full Name</p>
            <p>Age</p>
            <p>Nationality</p>
            <p>Languages</p>
            <p>Location</p>
            <p>Service</p>
          </div>
          <div className='info'>
            <p>:Sandip Rijal</p>
            <p>:{new Date().getFullYear() - 1997}</p>
            <p>:Nepalese</p>
            <p>:Nepali, English</p>
            <p>:Kathmandu, Nepal</p>
            <p>:Software Development</p>
          </div>
        </div>

        <DownButton href={cv} download='file'>
          DOWNLOAD CV
        </DownButton>

        {/* <PrimaryButton title={'Download cv'}></PrimaryButton> */}
      </div>
    </ImageSectionStyled>
  );
};

const ImageSectionStyled = styled.div`
  margin-top: 5rem;
  display: flex;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    .leftContent {
      margin-bottom: 2rem;
    }
  }

  .leftContent {
    width: 100%;
    img {
      width: 90%;
      height: 100%;
      object-fit: cover;
    }
  }

  .rightContent {
    h4 {
      font-size: 2rem;
      color: var(--white-color);
      span {
        font-size: 2rem;
      }
    }
    .paragraph {
      padding: 1rem 0;
    }

    .aboutInfo {
      display: flex;
      padding-bottom: 1.4rem;
      .infoTitle {
        padding-right: 3rem;
        p {
          font-weight: 600;
        }
      }
      .infoTitle,
      .info {
        p {
          padding: 0.3rem 0.1rem;
        }
      }
    }
  }
`;

const DownButton = styled.a`
  padding: 20px;
  font-size: 1.2rem;
  background-color: var(--primary-color);
  outline: none;
  border: none;
  color: white;
  text-decoration: none;
  cursor: pointer;
  border-radius: 10px;
  margin-top: 50px;
`;

export default ImageSection;
