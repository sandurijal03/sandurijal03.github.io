import * as React from "react";
import styled from "styled-components";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import WebRoundedIcon from "@mui/icons-material/WebRounded";
import CloudQueueRoundedIcon from "@mui/icons-material/CloudQueueRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import TokenRoundedIcon from "@mui/icons-material/TokenRounded";
import HubRoundedIcon from "@mui/icons-material/HubRounded";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";
import {
  education,
  personalInfo,
  Skill,
  skills as skillsByCategory,
  workExperience,
} from "../data/resume";
import { MainLayout } from "../styles/Layouts";

const LazyResumeHeroThreeScene = React.lazy(
  () => import("../components/ResumeHeroThreeScene"),
);
const LazyResumeExperienceThreeScene = React.lazy(
  () => import("../components/ResumeExperienceThreeScene"),
);

type SkillWithCategory = Skill & {
  category: string;
};

type GroupedSkills = {
  category: string;
  topSkills: Skill[];
};

const shortenText = (text: string) => {
  const cleanText = text.trim();
  const sentenceParts = cleanText.split(". ").filter((part) => part.length > 0);

  if (sentenceParts.length <= 2) {
    return cleanText;
  }

  const preview = sentenceParts.slice(0, 2).join(". ");
  return preview.endsWith(".") ? preview : `${preview}.`;
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Programming Languages":
      return <TerminalRoundedIcon />;
    case "Frontend Technologies":
      return <WebRoundedIcon />;
    case "Backend & Cloud":
      return <CloudQueueRoundedIcon />;
    case "Databases":
      return <StorageRoundedIcon />;
    case "Microsoft Technologies":
      return <TokenRoundedIcon />;
    case "Blockchain & Web3":
      return <HubRoundedIcon />;
    default:
      return <PrecisionManufacturingRoundedIcon />;
  }
};

const ResumePage = () => {
  const [showHeroScene, setShowHeroScene] = React.useState(false);
  const [showExperienceScene, setShowExperienceScene] = React.useState(false);
  const [activeExperienceIndex, setActiveExperienceIndex] = React.useState(0);

  React.useEffect(() => {
    const shouldEnableScene = window.matchMedia("(min-width: 760px)").matches;

    if (!shouldEnableScene) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setShowHeroScene(true);
    }, 240);

    return () => window.clearTimeout(timeoutId);
  }, []);

  React.useEffect(() => {
    const shouldEnableScene = window.matchMedia("(min-width: 900px)").matches;

    if (!shouldEnableScene) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setShowExperienceScene(true);
    }, 420);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const yearsOfExperience = Math.max(1, new Date().getFullYear() - 2017);
  const allSkills = React.useMemo<SkillWithCategory[]>(() => {
    const flattenedSkills: SkillWithCategory[] = [];

    for (const categoryName in skillsByCategory) {
      const categorySkills = skillsByCategory[categoryName];

      for (const skill of categorySkills) {
        flattenedSkills.push({
          ...skill,
          category: categoryName,
        });
      }
    }

    return flattenedSkills;
  }, []);
  const featuredSkills = React.useMemo<SkillWithCategory[]>(() => {
    const uniqueSkills = Array.from(
      new Map(allSkills.map((skill) => [skill.name, skill])).values(),
    );

    return uniqueSkills.sort((first, second) => second.level - first.level);
  }, [allSkills]);
  const groupedSkills = React.useMemo<GroupedSkills[]>(() => {
    const groups: GroupedSkills[] = [];

    for (const categoryName in skillsByCategory) {
      groups.push({
        category: categoryName,
        topSkills: [...skillsByCategory[categoryName]]
          .sort((first, second) => second.level - first.level)
          .slice(0, 4),
      });
    }

    return groups;
  }, []);
  const [activeSkillIndex, setActiveSkillIndex] = React.useState(0);

  React.useEffect(() => {
    if (featuredSkills.length === 0) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveSkillIndex(
        (previousIndex) => (previousIndex + 1) % featuredSkills.length,
      );
    }, 2600);

    return () => window.clearInterval(intervalId);
  }, [featuredSkills.length]);

  const spotlightSkill = featuredSkills[activeSkillIndex];
  const latestRole = workExperience[0];
  const topStack = featuredSkills.slice(0, 4).map((skill) => skill.name);

  return (
    <ResumePageStyled>
      <MainLayout>
        <HeroCard>
          <HeroSceneLayer>
            {showHeroScene ? (
              <React.Suspense fallback={null}>
                <LazyResumeHeroThreeScene
                  activeCategory={spotlightSkill?.category}
                />
              </React.Suspense>
            ) : null}
          </HeroSceneLayer>
          <HeroContent>
            <Kicker>Curriculum Vitae</Kicker>
            <NameTitle>{personalInfo.name}</NameTitle>
            <Headline>{personalInfo.title}</Headline>
            <Summary>{personalInfo.tagline}</Summary>
            <QuickFacts>
              <QuickFactCard>
                <QuickFactValue>{yearsOfExperience}+</QuickFactValue>
                <QuickFactLabel>Years in tech</QuickFactLabel>
              </QuickFactCard>
              <QuickFactCard>
                <QuickFactValue>{workExperience.length}</QuickFactValue>
                <QuickFactLabel>Professional roles</QuickFactLabel>
              </QuickFactCard>
              <QuickFactCard>
                <QuickFactValue>{allSkills.length}</QuickFactValue>
                <QuickFactLabel>Core skills tracked</QuickFactLabel>
              </QuickFactCard>
            </QuickFacts>
          </HeroContent>
        </HeroCard>

        <ResumeGrid>
          <LeftColumn>
            <Panel as="aside">
              <PanelTitle>Resume Snapshot</PanelTitle>
              <SnapshotList>
                <SnapshotItem>
                  <SnapshotLabel>Current focus</SnapshotLabel>
                  <SnapshotValue>
                    {latestRole?.title} at {latestRole?.company}
                  </SnapshotValue>
                </SnapshotItem>
                <SnapshotItem>
                  <SnapshotLabel>Primary stack</SnapshotLabel>
                  <SnapshotValue>{topStack.join(", ")}</SnapshotValue>
                </SnapshotItem>
                <SnapshotItem>
                  <SnapshotLabel>Career span</SnapshotLabel>
                  <SnapshotValue>
                    2017 - Present ({yearsOfExperience}+ years)
                  </SnapshotValue>
                </SnapshotItem>
                <SnapshotItem>
                  <SnapshotLabel>Base</SnapshotLabel>
                  <SnapshotValue>{personalInfo.location}</SnapshotValue>
                </SnapshotItem>
              </SnapshotList>
            </Panel>

            <Panel as="aside">
              <PanelTitle>Top Skills</PanelTitle>
              <SkillsIntro>
                Grouped by focus area for faster scanning.
              </SkillsIntro>
              <SkillsSpotlight aria-live="polite">
                <SpotlightLabel>Now Highlighting</SpotlightLabel>
                <SpotlightName>
                  {spotlightSkill?.name ?? "Skill Focus"}
                </SpotlightName>
                <SpotlightMeta>
                  {spotlightSkill?.category ?? "Core Expertise"}
                </SpotlightMeta>
              </SkillsSpotlight>
              <SkillsCloud>
                {groupedSkills.map((groupedSkill) => (
                  <SkillCategory key={groupedSkill.category}>
                    <CategoryHeading>
                      <CategoryIcon>
                        {getCategoryIcon(groupedSkill.category)}
                      </CategoryIcon>
                      <CategoryName>{groupedSkill.category}</CategoryName>
                    </CategoryHeading>
                    <CategorySkills>
                      {groupedSkill.topSkills.map((skill) => (
                        <SkillChip
                          $isFeatured={spotlightSkill?.name === skill.name}
                          key={`${groupedSkill.category}-${skill.name}`}
                        >
                          {skill.name}
                        </SkillChip>
                      ))}
                    </CategorySkills>
                  </SkillCategory>
                ))}
              </SkillsCloud>
            </Panel>
          </LeftColumn>

          <RightColumn>
            <ExperiencePanel as="section">
              <ExperienceSceneLayer>
                {showExperienceScene ? (
                  <React.Suspense fallback={null}>
                    <LazyResumeExperienceThreeScene
                      itemCount={workExperience.length}
                      activeIndex={activeExperienceIndex}
                    />
                  </React.Suspense>
                ) : null}
              </ExperienceSceneLayer>
              <PanelContent>
                <SectionHeading>
                  <PanelTitle>Experience</PanelTitle>
                  <SectionMeta>Career highlights and impact</SectionMeta>
                </SectionHeading>
                <Timeline>
                  {workExperience.map((experience, index) => (
                    <TimelineItem
                      key={experience.id}
                      $isActive={activeExperienceIndex === index}
                      onMouseEnter={() => setActiveExperienceIndex(index)}
                      onFocus={() => setActiveExperienceIndex(index)}
                      tabIndex={0}
                    >
                      <TimelineMeta>
                        <TimelineBadge>{experience.duration}</TimelineBadge>
                        {experience.location && (
                          <TimelineBadge>{experience.location}</TimelineBadge>
                        )}
                      </TimelineMeta>
                      <TimelineTitle>{experience.title}</TimelineTitle>
                      <TimelineSubtitle>{experience.company}</TimelineSubtitle>
                      <TimelineText>
                        {shortenText(experience.description)}
                      </TimelineText>
                    </TimelineItem>
                  ))}
                </Timeline>
              </PanelContent>
            </ExperiencePanel>

            <Panel as="section">
              <SectionHeading>
                <PanelTitle>Education</PanelTitle>
                <SectionMeta>Academic background</SectionMeta>
              </SectionHeading>
              <Timeline>
                {education.map((item) => (
                  <TimelineItem key={item.id}>
                    <TimelineMeta>
                      <TimelineBadge>{item.duration}</TimelineBadge>
                      <TimelineBadge>{item.location}</TimelineBadge>
                    </TimelineMeta>
                    <TimelineTitle>{item.degree}</TimelineTitle>
                    <TimelineSubtitle>{item.institution}</TimelineSubtitle>
                    <TimelineText>{shortenText(item.description)}</TimelineText>
                  </TimelineItem>
                ))}
              </Timeline>
            </Panel>
          </RightColumn>
        </ResumeGrid>
      </MainLayout>
    </ResumePageStyled>
  );
};

const ResumePageStyled = styled.div``;

const HeroCard = styled.section`
  background: linear-gradient(
    120deg,
    var(--resume-hero-gradient-start),
    var(--resume-hero-gradient-end)
  );
  border: 1px solid var(--resume-hero-border);
  border-radius: 1rem;
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  position: relative;
  overflow: hidden;
  box-shadow: var(--resume-hero-shadow);

  &::after {
    content: "";
    position: absolute;
    width: 16rem;
    height: 16rem;
    right: -5rem;
    top: -8rem;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      var(--resume-hero-glow-start) 0%,
      var(--resume-hero-glow-end) 72%
    );
    pointer-events: none;
  }

  @media screen and (max-width: 760px) {
    padding: 1.8rem;
  }
`;

const HeroSceneLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
`;

const Kicker = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.16rem;
  font-size: 0.75rem;
  color: var(--primary-color-light);
  margin-bottom: 0.8rem;
  font-weight: 700;
`;

const NameTitle = styled.h1`
  margin-bottom: 0.4rem;
  line-height: 1.1;
`;

const Headline = styled.p`
  color: var(--white-color);
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
`;

const Summary = styled.p`
  max-width: 55rem;
  color: var(--font-light-color);
  line-height: 1.6;
  margin-bottom: 1.8rem;
`;

const QuickFacts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;

  @media screen and (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const QuickFactCard = styled.div`
  background-color: var(--resume-fact-card-bg);
  border: 1px solid var(--resume-fact-card-border);
  border-radius: 0.75rem;
  padding: 1rem 1.2rem;
`;

const QuickFactValue = styled.h4`
  color: var(--white-color);
  font-size: 1.7rem;
  margin-bottom: 0.25rem;
`;

const QuickFactLabel = styled.p`
  color: var(--font-light-color);
  font-size: 0.92rem;
`;

const ResumeGrid = styled.section`
  display: grid;
  grid-template-columns: minmax(18rem, 0.95fr) minmax(0, 1.8fr);
  gap: 2rem;
  align-items: start;

  @media screen and (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.aside`
  display: grid;
  gap: 1.5rem;
  position: sticky;
  top: 2rem;

  @media screen and (max-width: 1100px) {
    position: static;
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const RightColumn = styled.div`
  display: grid;
  gap: 1.6rem;
`;

const Panel = styled.div`
  border: 1px solid var(--resume-panel-border);
  background-color: var(--resume-panel-bg);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: var(--resume-panel-shadow);
`;

const ExperiencePanel = styled(Panel)`
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background: linear-gradient(
      160deg,
      var(--resume-experience-3d-overlay-start),
      var(--resume-experience-3d-overlay-end)
    );
  }
`;

const ExperienceSceneLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`;

const PanelContent = styled.div`
  position: relative;
  z-index: 1;
`;

const PanelTitle = styled.h3`
  color: var(--white-color);
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const SnapshotList = styled.ul`
  display: grid;
  gap: 1rem;
`;

const SnapshotItem = styled.li`
  display: grid;
  gap: 0.2rem;
  border-bottom: 1px solid var(--resume-divider-color);
  padding-bottom: 0.85rem;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const SnapshotLabel = styled.span`
  font-size: 0.82rem;
  color: var(--font-light-color);
  text-transform: uppercase;
  letter-spacing: 0.05rem;
`;

const SnapshotValue = styled.p`
  color: var(--white-color);
  font-size: 0.98rem;
  word-break: break-word;
`;

const SkillsIntro = styled.p`
  color: var(--font-light-color);
  font-size: 0.92rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

const SkillsSpotlight = styled.div`
  border: 1px solid var(--resume-spotlight-border);
  background: linear-gradient(
    120deg,
    var(--resume-spotlight-gradient-start),
    var(--resume-spotlight-gradient-end)
  );
  border-radius: 0.85rem;
  padding: 0.9rem;
  margin-bottom: 1rem;
`;

const SpotlightLabel = styled.span`
  display: inline-block;
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.08rem;
  color: var(--resume-spotlight-label);
  margin-bottom: 0.35rem;
`;

const SpotlightName = styled.p`
  color: var(--white-color);
  font-size: 1.05rem;
  margin-bottom: 0.2rem;
  font-weight: 600;
`;

const SpotlightMeta = styled.small`
  color: var(--font-light-color);
  font-size: 0.86rem;
`;

const SkillsCloud = styled.div`
  display: grid;
  gap: 0.9rem;
`;

const SkillCategory = styled.article`
  border: 1px solid var(--resume-category-border);
  border-radius: 0.75rem;
  padding: 0.85rem;
  background-color: var(--resume-category-bg);
`;

const CategoryHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.65rem;
`;

const CategoryIcon = styled.span`
  width: 1.8rem;
  height: 1.8rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.45rem;
  background-color: var(--resume-category-icon-bg);
  border: 1px solid var(--resume-category-icon-border);

  svg {
    font-size: 1rem;
    color: var(--resume-category-icon-color);
  }
`;

const CategoryName = styled.h4`
  color: var(--white-color);
  font-size: 0.9rem;
  font-weight: 600;
`;

const CategorySkills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillChip = styled.span<{ $isFeatured: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 0.46rem 0.78rem;
  border-radius: 999px;
  border: 1px solid
    ${(props) =>
      props.$isFeatured
        ? "var(--resume-chip-featured-border)"
        : "var(--resume-chip-border)"};
  background: ${(props) =>
    props.$isFeatured
      ? "linear-gradient(120deg, var(--resume-chip-featured-gradient-start), var(--resume-chip-featured-gradient-end))"
      : "var(--resume-chip-bg)"};
  color: ${(props) =>
    props.$isFeatured
      ? "var(--resume-chip-featured-color)"
      : "var(--white-color)"};
  font-size: 0.86rem;
  letter-spacing: 0.01rem;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: var(--resume-chip-hover-border);
  }
`;

const SectionHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1.3rem;

  @media screen and (max-width: 760px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1rem;
  }
`;

const SectionMeta = styled.p`
  color: var(--font-light-color);
  font-size: 0.9rem;
`;

const Timeline = styled.div`
  border-left: 2px solid var(--resume-timeline-line);
  margin-left: 0.35rem;
  padding-left: 1.3rem;
  display: grid;
  gap: 1rem;

  @media screen and (max-width: 760px) {
    margin-left: 0.1rem;
    padding-left: 0.95rem;
  }
`;

const TimelineItem = styled.article<{ $isActive?: boolean }>`
  background-color: var(--resume-timeline-item-bg);
  border: 1px solid var(--resume-timeline-item-border);
  border-radius: 0.85rem;
  padding: 1.15rem;
  position: relative;
  outline: none;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &::before {
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

  &:hover {
    transform: translateY(-2px);
    border-color: var(--resume-timeline-item-hover-border);
  }

  ${(props) =>
    props.$isActive
      ? `
    border-color: var(--resume-timeline-item-hover-border);
    box-shadow: 0 0 0 1px var(--resume-timeline-item-hover-border);
  `
      : ""}

  &:focus-visible {
    border-color: var(--resume-timeline-item-hover-border);
    box-shadow: 0 0 0 2px var(--resume-timeline-item-hover-border);
  }

  @media screen and (max-width: 760px) {
    &::before {
      left: -1.5rem;
    }
  }
`;

const TimelineMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.7rem;
`;

const TimelineBadge = styled.span`
  font-size: 0.8rem;
  line-height: 1;
  padding: 0.42rem 0.62rem;
  border-radius: 999px;
  background-color: var(--resume-timeline-badge-bg);
  color: var(--white-color);
  border: 1px solid var(--resume-timeline-badge-border);
`;

const TimelineTitle = styled.h4`
  font-size: 1.15rem;
  margin-bottom: 0.25rem;
  color: var(--white-color);
`;

const TimelineSubtitle = styled.h5`
  font-size: 0.95rem;
  color: var(--primary-color-light);
  margin-bottom: 0.6rem;
`;

const TimelineText = styled.p`
  color: var(--font-light-color);
  font-size: 0.96rem;
  line-height: 1.55;
`;

export default ResumePage;
