import * as React from "react";
import styled from "styled-components";
import {
  education,
  getSkillsForResume,
  personalInfo,
  workExperience,
} from "../data/resume";
import { MainLayout } from "../styles/Layouts";

const shortenText = (text: string) => {
  const cleanText = text.trim();
  const sentenceParts = cleanText.split(". ").filter((part) => part.length > 0);

  if (sentenceParts.length <= 2) {
    return cleanText;
  }

  const preview = sentenceParts.slice(0, 2).join(". ");
  return preview.endsWith(".") ? preview : `${preview}.`;
};

const ResumePage = () => {
  const yearsOfExperience = Math.max(1, new Date().getFullYear() - 2017);
  const featuredSkills = getSkillsForResume()
    .sort((first, second) => second.level - first.level)
    .slice(0, 8);
  const latestRole = workExperience[0];
  const topStack = featuredSkills.slice(0, 4).map((skill) => skill.name);

  return (
    <ResumePageStyled>
      <MainLayout>
        <section className="heroCard">
          <p className="kicker">Curriculum Vitae</p>
          <h1>{personalInfo.name}</h1>
          <p className="headline">{personalInfo.title}</p>
          <p className="summary">{personalInfo.tagline}</p>
          <div className="quickFacts">
            <div>
              <h4>{yearsOfExperience}+</h4>
              <p>Years in tech</p>
            </div>
            <div>
              <h4>{workExperience.length}</h4>
              <p>Professional roles</p>
            </div>
            <div>
              <h4>{featuredSkills.length}</h4>
              <p>Core skills tracked</p>
            </div>
          </div>
        </section>

        <section className="resumeGrid">
          <aside className="leftColumn">
            <div className="panel">
              <h3>Resume Snapshot</h3>
              <ul className="snapshotList">
                <li>
                  <span>Current focus</span>
                  <p>
                    {latestRole?.title} at {latestRole?.company}
                  </p>
                </li>
                <li>
                  <span>Primary stack</span>
                  <p>{topStack.join(", ")}</p>
                </li>
                <li>
                  <span>Career span</span>
                  <p>2017 - Present ({yearsOfExperience}+ years)</p>
                </li>
                <li>
                  <span>Base</span>
                  <p>{personalInfo.location}</p>
                </li>
              </ul>
            </div>

            <div className="panel">
              <h3>Top Skills</h3>
              <p className="skillsIntro">
                Tools and technologies I use most often in production.
              </p>
              <div className="skillsCloud">
                {featuredSkills.map((skill, index) => (
                  <span
                    key={skill.name}
                    className={`skillChip ${index < 3 ? "isPrimary" : ""}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <div className="rightColumn">
            <section className="panel">
              <div className="sectionHeading">
                <h3>Experience</h3>
                <p>Career highlights and impact</p>
              </div>
              <div className="timeline">
                {workExperience.map((experience) => (
                  <article className="timelineItem" key={experience.id}>
                    <div className="timelineMeta">
                      <span className="duration">{experience.duration}</span>
                      {experience.location && (
                        <span className="location">{experience.location}</span>
                      )}
                    </div>
                    <h4>{experience.title}</h4>
                    <h5>{experience.company}</h5>
                    <p>{shortenText(experience.description)}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="panel">
              <div className="sectionHeading">
                <h3>Education</h3>
                <p>Academic background</p>
              </div>
              <div className="timeline">
                {education.map((item) => (
                  <article className="timelineItem" key={item.id}>
                    <div className="timelineMeta">
                      <span className="duration">{item.duration}</span>
                      <span className="location">{item.location}</span>
                    </div>
                    <h4>{item.degree}</h4>
                    <h5>{item.institution}</h5>
                    <p>{shortenText(item.description)}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      </MainLayout>
    </ResumePageStyled>
  );
};

const ResumePageStyled = styled.div`
  .heroCard {
    background: linear-gradient(
      120deg,
      rgba(77, 163, 255, 0.14),
      rgba(16, 18, 26, 0.35)
    );
    border: 1px solid var(--border-color);
    border-radius: 1rem;
    padding: 2.5rem;
    margin-bottom: 2.5rem;
    position: relative;
    overflow: hidden;
  }

  .heroCard::after {
    content: "";
    position: absolute;
    width: 16rem;
    height: 16rem;
    right: -5rem;
    top: -8rem;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(77, 163, 255, 0.35) 0%,
      rgba(77, 163, 255, 0) 72%
    );
    pointer-events: none;
  }

  .kicker {
    text-transform: uppercase;
    letter-spacing: 0.16rem;
    font-size: 0.75rem;
    color: var(--primary-color-light);
    margin-bottom: 0.8rem;
    font-weight: 700;
  }

  h1 {
    margin-bottom: 0.4rem;
    line-height: 1.1;
  }

  .headline {
    color: var(--white-color);
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
  }

  .summary {
    max-width: 55rem;
    color: var(--font-light-color);
    line-height: 1.6;
    margin-bottom: 1.8rem;
  }

  .quickFacts {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .quickFacts > div {
    background-color: rgba(25, 29, 43, 0.8);
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    padding: 1rem 1.2rem;
  }

  .quickFacts h4 {
    color: var(--white-color);
    font-size: 1.7rem;
    margin-bottom: 0.25rem;
  }

  .quickFacts p {
    color: var(--font-light-color);
    font-size: 0.92rem;
  }

  .resumeGrid {
    display: grid;
    grid-template-columns: minmax(18rem, 0.95fr) minmax(0, 1.8fr);
    gap: 2rem;
    align-items: start;
  }

  .leftColumn {
    display: grid;
    gap: 1.5rem;
    position: sticky;
    top: 2rem;
  }

  .rightColumn {
    display: grid;
    gap: 1.6rem;
  }

  .panel {
    border: 1px solid var(--border-color);
    background-color: var(--sidebar-dark-color);
    border-radius: 1rem;
    padding: 1.5rem;
  }

  .panel h3 {
    color: var(--white-color);
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }

  .snapshotList {
    display: grid;
    gap: 1rem;
  }

  .snapshotList li {
    display: grid;
    gap: 0.2rem;
    border-bottom: 1px solid rgba(164, 172, 196, 0.15);
    padding-bottom: 0.85rem;
  }

  .snapshotList li:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .snapshotList span {
    font-size: 0.82rem;
    color: var(--font-light-color);
    text-transform: uppercase;
    letter-spacing: 0.05rem;
  }

  .snapshotList p {
    color: var(--white-color);
    font-size: 0.98rem;
    word-break: break-word;
  }

  .skillsIntro {
    color: var(--font-light-color);
    font-size: 0.92rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  .skillsCloud {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
  }

  .skillChip {
    display: inline-flex;
    align-items: center;
    padding: 0.46rem 0.78rem;
    border-radius: 999px;
    border: 1px solid rgba(164, 172, 196, 0.35);
    background-color: rgba(16, 18, 26, 0.5);
    color: var(--white-color);
    font-size: 0.86rem;
    letter-spacing: 0.01rem;
    transition:
      transform 0.2s ease,
      border-color 0.2s ease,
      background-color 0.2s ease;
  }

  .skillChip.isPrimary {
    border-color: rgba(77, 163, 255, 0.55);
    background: linear-gradient(
      120deg,
      rgba(77, 163, 255, 0.2),
      rgba(77, 163, 255, 0.08)
    );
    color: #dceeff;
  }

  .skillChip:hover {
    transform: translateY(-1px);
    border-color: rgba(77, 163, 255, 0.65);
  }

  .sectionHeading {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    margin-bottom: 1.3rem;
  }

  .sectionHeading p {
    color: var(--font-light-color);
    font-size: 0.9rem;
  }

  .timeline {
    border-left: 2px solid rgba(77, 163, 255, 0.35);
    margin-left: 0.35rem;
    padding-left: 1.3rem;
    display: grid;
    gap: 1rem;
  }

  .timelineItem {
    background-color: rgba(16, 18, 26, 0.55);
    border: 1px solid var(--border-color);
    border-radius: 0.85rem;
    padding: 1.15rem;
    position: relative;
    transition:
      transform 0.25s ease,
      border-color 0.25s ease;
  }

  .timelineItem::before {
    content: "";
    width: 0.85rem;
    height: 0.85rem;
    border-radius: 50%;
    border: 2px solid var(--primary-color);
    background-color: var(--background-dark-color);
    position: absolute;
    left: -1.82rem;
    top: 1.35rem;
  }

  .timelineItem:hover {
    transform: translateY(-2px);
    border-color: rgba(77, 163, 255, 0.55);
  }

  .timelineMeta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.7rem;
  }

  .timelineMeta span {
    font-size: 0.8rem;
    line-height: 1;
    padding: 0.42rem 0.62rem;
    border-radius: 999px;
    background-color: rgba(77, 163, 255, 0.18);
    color: var(--white-color);
    border: 1px solid rgba(77, 163, 255, 0.35);
  }

  .timelineItem h4 {
    font-size: 1.15rem;
    margin-bottom: 0.25rem;
    color: var(--white-color);
  }

  .timelineItem h5 {
    font-size: 0.95rem;
    color: var(--primary-color-light);
    margin-bottom: 0.6rem;
  }

  .timelineItem p {
    color: var(--font-light-color);
    font-size: 0.96rem;
    line-height: 1.55;
  }

  @media screen and (max-width: 1100px) {
    .resumeGrid {
      grid-template-columns: 1fr;
    }

    .leftColumn {
      position: static;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media screen and (max-width: 760px) {
    .heroCard {
      padding: 1.8rem;
    }

    .quickFacts {
      grid-template-columns: 1fr;
    }

    .leftColumn {
      grid-template-columns: 1fr;
    }

    .sectionHeading {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .timeline {
      margin-left: 0.1rem;
      padding-left: 0.95rem;
    }

    .timelineItem::before {
      left: -1.5rem;
    }
  }
`;

export default ResumePage;
