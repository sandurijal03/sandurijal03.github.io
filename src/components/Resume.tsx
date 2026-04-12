import * as React from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../styles/Layouts';
import SmallTitle from './SmallTitle';
import Title from './Title';
import BusinessCenter from '@mui/icons-material/BusinessCenter';
import School from '@mui/icons-material/School';
import ResumeItem from './ResumeItem';
import { getExperienceForResume, getEducationForResume } from '../data/resume';

const Resume = () => {
  const briefCase = <BusinessCenter />;
  const school = <School />;

  const workExperience = getExperienceForResume();
  const educationData = getEducationForResume();

  return (
    <ResumeStyled>
      <Title title={'Resume'} span={'Resume'} />
      <InnerLayout>
        <div className='smallTitle'>
          <SmallTitle icon={school} title={'Education'} />
        </div>
        <div className='resumeContent'>
          {educationData.map((item, index) => (
            <ResumeItem
              key={index}
              year={item.year}
              title={item.title}
              subtitle={item.subtitle}
              text={item.text}
            />
          ))}
        </div>
        <div className='smallTitle uSmallTitleMargin'>
          <SmallTitle icon={briefCase} title={'Working Experience'} />
        </div>
        <div className='resumeContent'>
          {workExperience.slice(0, 6).map((item, index) => (
            <ResumeItem
              key={index}
              year={item.year}
              title={item.title}
              subtitle={item.subtitle}
              text={item.text}
            />
          ))}
        </div>
      </InnerLayout>
    </ResumeStyled>
  );
};

const ResumeStyled = styled.section`
  .smallTitle {
    padding-bottom: 3rem;
  }

  .uSmallTitleMargin {
    margin-top: 4rem;
  }

  .resumeContent {
    border-left: 3px solid var(--border-color);
    position: relative;
    padding-left: 0;

    &::before {
      content: '';
      position: absolute;
      left: -2px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(
        180deg,
        var(--primary-color),
        var(--border-color)
      );
      opacity: 0.7;
    }
  }
`;

export default Resume;
