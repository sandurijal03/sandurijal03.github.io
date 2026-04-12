import * as React from 'react';
import styled from 'styled-components';
import ImageSection from '../components/ImageSection';
import ServicesSection from '../components/ServicesSection';
import Title from '../components/Title';
import { MainLayout } from '../styles/Layouts';

const AboutPage: React.FC = () => {
  return (
    <MainLayout>
      <AboutStyled>
        <Title title={'About Me'} span={'About Me'} />
        <ImageSection />
        <ServicesSection />
        {/*

        <ReviewsSection />
        */}
      </AboutStyled>
    </MainLayout>
  );
};

const AboutStyled = styled.section``;

export default AboutPage;
