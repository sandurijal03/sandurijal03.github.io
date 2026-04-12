import * as React from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../styles/Layouts';
import Progress from './Progress';
import Title from './Title';
import { getSkillsForResume } from '../data/resume';

const Skills = () => {
  const skillsData = getSkillsForResume();

  return (
    <SkillsStyled>
      <Title title={'My Skills'} span={'My Skills'} />
      <InnerLayout>
        <div className='skills'>
          {skillsData.map((skill, index) => (
            <Progress
              key={skill.name}
              title={skill.name}
              width={`${skill.level}%`}
              text={`${skill.level}%`}
            />
          ))}
        </div>
      </InnerLayout>
    </SkillsStyled>
  );
};

const SkillsStyled = styled.section`
  .skills {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 3rem;
    grid-row-gap: 2rem;

    @media screen and (max-width: 700px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

export default Skills;
