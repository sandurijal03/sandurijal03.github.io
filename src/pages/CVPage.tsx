import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import EmojiEventsRounded from "@mui/icons-material/EmojiEventsRounded";
import Email from "@mui/icons-material/Email";
import GitHub from "@mui/icons-material/GitHub";
import Language from "@mui/icons-material/Language";
import LinkedIn from "@mui/icons-material/LinkedIn";
import LocationOn from "@mui/icons-material/LocationOn";
import PsychologyRounded from "@mui/icons-material/PsychologyRounded";
import PublicRounded from "@mui/icons-material/PublicRounded";
import RocketLaunchRounded from "@mui/icons-material/RocketLaunchRounded";
import WorkspacePremiumRounded from "@mui/icons-material/WorkspacePremiumRounded";
import {
  personalInfo,
  workExperience,
  education,
  skills,
} from "../data/resume";

// Global print styles
const PrintStyles = createGlobalStyle`
  @media print {
    @page {
      margin: 0.2in;
      size: A4;
    }
    
    /* Reset and show everything first */
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      box-sizing: border-box !important;
    }
    
    html, body {
      font-size: 10px !important;
      line-height: 1.3 !important;
      color: #000 !important;
      background: white !important;
      margin: 0 !important;
      padding: 0 !important;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
      width: 100% !important;
      height: 100% !important;
    }
    
    #sidebar {
      display: none !important;
    }
    
    /* Hide navigation elements */
    div[class*="SidebarStyled"],
    div[class*="NavigationStyled"],
    .theme,
    .lightDarkMode {
      display: none !important;
      visibility: hidden !important;
    }

    /* Ensure CV content takes full width */
    div[class*="CVContainer"] {
      display: block !important;
      visibility: visible !important;
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      background: white !important;
      box-shadow: none !important;
      border-radius: 0 !important;
    }

    /* Make sections full width */
    section,
    div[class*="Section"] {
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 8px 0 !important;
    }

    /* Make header full width */
    header,
    div[class*="Header"] {
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      padding: 8px 0 !important;
    }

    /* Typography improvements */
    h1 {
      font-size: 18px !important;
      font-weight: 700 !important;
      margin-bottom: 4px !important;
      color: #000 !important;
    }

    h2 {
      font-size: 11px !important;
      font-weight: 600 !important;
      color: #333 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.5px !important;
      margin-bottom: 6px !important;
    }

    h3 {
      font-size: 12px !important;
      font-weight: 600 !important;
      color: #000 !important;
      margin-bottom: 8px !important;
      border-bottom: 1px solid #333 !important;
      padding-bottom: 3px !important;
    }

    h4 {
      font-size: 11px !important;
      font-weight: 600 !important;
      color: #000 !important;
      margin: 0 0 3px 0 !important;
    }

    p {
      font-size: 9px !important;
      line-height: 1.3 !important;
      margin: 4px 0 !important;
      color: #333 !important;
    }

    /* Section improvements */
    section {
      margin-bottom: 12px !important;
      page-break-inside: avoid;
    }

    /* Hide buttons */
    button {
      display: none !important;
    }

    /* List improvements */
    ul, ol {
      margin: 4px 0 !important;
      padding-left: 12px !important;
    }

    li {
      font-size: 9px !important;
      line-height: 1.3 !important;
      margin-bottom: 2px !important;
      color: #333 !important;
    }

    /* Contact info improvements */
    div[class*="ContactItem"] {
      font-size: 8px !important;
      margin-bottom: 2px !important;
    }

    /* Experience items */
    div[class*="ExperienceItem"] {
      margin-bottom: 10px !important;
      padding-left: 12px !important;
      border-left: 2px solid #000 !important;
    }

    /* Skills and achievements */
    div[class*="AchievementItem"] {
      margin-bottom: 8px !important;
      padding: 8px !important;
      border: 1px solid #ddd !important;
      border-radius: 0 !important;
    }

    /* Icon handling */
    svg {
      width: 8px !important;
      height: 8px !important;
      color: #000 !important;
    }

    /* Ensure proper spacing */
    strong {
      font-weight: 600 !important;
      color: #000 !important;
    }
  }
`;

// CV Component with integrated styling
const CVPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const currentFocusItems = [
    {
      icon: <PsychologyRounded />,
      title: "Learning",
      text: "Currently studying Rust and Python with Neovim for data science.",
    },
    {
      icon: <RocketLaunchRounded />,
      title: "Goal",
      text: "Building everything with Rust and expanding into systems-level development.",
    },
    {
      icon: <AutoAwesomeRounded />,
      title: "Expertise",
      text: "Available for consultation on React, Node.js, JavaScript, and TypeScript.",
    },
    {
      icon: <EmojiEventsRounded />,
      title: "Growth",
      text: "Continuously expanding skillset across both frontend and backend technologies.",
    },
  ];

  const credentialCards = [
    {
      icon: <WorkspacePremiumRounded />,
      title: "Professional Certifications",
      subtitle: "Validated learning milestones",
      items: [
        {
          title: "Build web app with React.js",
          context: "OpenClassrooms",
          period: "Issued Jul 2019",
          details:
            "Applied component architecture, state handling, and responsive front-end fundamentals.",
        },
      ],
    },
    {
      icon: <EmojiEventsRounded />,
      title: "Professional Awards",
      subtitle: "Recognized delivery and impact",
      items: [
        {
          title: "Best Employee of the Month - Evening Shift",
          context: "IP Engineering Department, Subisu Cablenet Pvt. Ltd.",
          period: "Bhadra 2074 (Aug/Sep 2017)",
          details:
            "Received certificate of appreciation from CEO Binaya M. Saud for service quality and reliability.",
        },
      ],
    },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const shouldAutoDownload = searchParams.get("download") === "1";

    if (!shouldAutoDownload) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      window.print();
    }, 450);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <>
      <PrintStyles />
      <CVContainer $isVisible={isVisible}>
        {/* Header Section */}
        <Header>
          <HeaderContent>
            <PersonalInfo>
              <h1>{personalInfo.name}</h1>
              <h2>{personalInfo.title}</h2>
              <Tagline>{personalInfo.tagline}</Tagline>
            </PersonalInfo>
            <ContactInfo>
              <ContactItem>
                <Email />
                <span>{personalInfo.email}</span>
              </ContactItem>
              <ContactItem>
                <LocationOn />
                <span>{personalInfo.location}</span>
              </ContactItem>
              <ContactItem>
                <GitHub />
                <span>{personalInfo.github}</span>
              </ContactItem>
              <ContactItem>
                <LinkedIn />
                <span>{personalInfo.linkedin}</span>
              </ContactItem>

              <ContactItem>
                <Language />
                <span>{personalInfo.website}</span>
              </ContactItem>
            </ContactInfo>
          </HeaderContent>
        </Header>

        {/* Professional Summary */}
        <Section>
          <SectionTitle>Professional Summary</SectionTitle>
          <SectionContent>
            <p>
              Experienced Senior Software Engineer with 8+ years in the
              technology industry, currently working remotely for Norbrik
              (Australia) from Nepal. Started career in technical support and
              networking, then transitioned to full-stack development through
              freelancing and internships. Specialized in modern web
              technologies including React, Node.js, GraphQL, and blockchain
              development with Rust and Solana. Strong background in building
              web applications from scratch, API development, and integrating
              complex systems.
            </p>
            <Highlights>
              <HighlightItem>
                <HighlightIcon>
                  <PublicRounded />
                </HighlightIcon>
                <span>Remote Work Expert - Australia-based company</span>
              </HighlightItem>
              <HighlightItem>
                <HighlightIcon>
                  <AutoAwesomeRounded />
                </HighlightIcon>
                <span>Full-Stack & Blockchain Development</span>
              </HighlightItem>
              <HighlightItem>
                <HighlightIcon>
                  <RocketLaunchRounded />
                </HighlightIcon>
                <span>Self-taught Developer with Diverse Background</span>
              </HighlightItem>
            </Highlights>
          </SectionContent>
        </Section>

        {/* Skills Section */}
        <Section>
          <SectionTitle>Technical Skills</SectionTitle>
          <SectionContent>
            <SkillsGrid>
              {Object.entries(skills).map(
                ([category, skillList], categoryIndex) => (
                  <SkillCategory key={category}>
                    <h4>{category}</h4>
                    <SkillsList>
                      {skillList.map((skill, index) => (
                        <SkillTag
                          key={index}
                          $isPrimary={skill.isPrimary}
                          $delay={categoryIndex * 0.1 + index * 0.05}
                        >
                          {skill.name}
                        </SkillTag>
                      ))}
                    </SkillsList>
                  </SkillCategory>
                ),
              )}
            </SkillsGrid>
          </SectionContent>
        </Section>

        {/* Experience Section */}
        <Section>
          <SectionTitle>Professional Experience</SectionTitle>
          <SectionContent>
            {workExperience.map((experience, index) => (
              <ExperienceItem key={index}>
                <ExperienceHeader>
                  <h4>{experience.title}</h4>
                  <div className="meta-info">
                    <Company>{experience.company}</Company>
                    <Location>{experience.location}</Location>
                    <Duration>{experience.duration}</Duration>
                  </div>
                </ExperienceHeader>
                <p>{experience.description}</p>
                <TechTags>
                  <strong>Technologies:</strong> {experience.technologies}
                </TechTags>
              </ExperienceItem>
            ))}
          </SectionContent>
        </Section>

        {/* Education Section */}
        <Section>
          <SectionTitle>Education</SectionTitle>
          <SectionContent>
            <div>
              <h4>
                Bachelor of Science, Computer Science and Information Technology
                (BSc CSIT)
              </h4>
              <Company>Tribhuwan University</Company> •{" "}
              <Duration>2016 - 2022</Duration>
              <p style={{ marginTop: "12px" }}>
                Completed comprehensive coursework in software engineering, data
                structures, algorithms, database systems, and web development.
                Final year project focused on full-stack web development using
                modern JavaScript frameworks.
              </p>
              <SkillsUsed>
                <strong>Key Coursework:</strong> Data Structures & Algorithms,
                Software Engineering, Database Management Systems, Web
                Development, Object-Oriented Programming, Computer Networks
              </SkillsUsed>
            </div>
          </SectionContent>
        </Section>

        {/* Certifications & Achievements */}
        <Section>
          <SectionTitle>Certifications & Achievements</SectionTitle>
          <SectionContent>
            <AchievementsGrid>
              {credentialCards.map((card) => (
                <AchievementItem key={card.title}>
                  <AchievementHeader>
                    <AchievementIcon>{card.icon}</AchievementIcon>
                    <AchievementTitleGroup>
                      <h4>{card.title}</h4>
                      <p>{card.subtitle}</p>
                    </AchievementTitleGroup>
                  </AchievementHeader>

                  <AchievementList>
                    {card.items.map((item) => (
                      <AchievementListItem key={item.title}>
                        <AchievementItemTitle>
                          {item.title}
                        </AchievementItemTitle>
                        <AchievementMeta>
                          <span>{item.context}</span>
                          <small>{item.period}</small>
                        </AchievementMeta>
                        <AchievementDetails>{item.details}</AchievementDetails>
                      </AchievementListItem>
                    ))}
                  </AchievementList>
                </AchievementItem>
              ))}
            </AchievementsGrid>
          </SectionContent>
        </Section>

        {/* Current Focus Section */}
        <Section>
          <SectionTitle>Current Focus & Goals</SectionTitle>
          <SectionContent>
            <FocusGrid>
              {currentFocusItems.map((item) => (
                <FocusCard key={item.title}>
                  <FocusIcon>{item.icon}</FocusIcon>
                  <FocusContent>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </FocusContent>
                </FocusCard>
              ))}
            </FocusGrid>
          </SectionContent>
        </Section>

        {/* PDF Download Button */}
        <PDFButton onClick={handleDownloadPDF} title="Download as PDF">
          <i className="fas fa-download"></i>
        </PDFButton>
      </CVContainer>
    </>
  );
};

// Styled Components (adapted for portfolio theme)
const CVContainer = styled.div<{ $isVisible: boolean }>`
  max-width: 8.5in;
  margin: 20px auto;
  background: linear-gradient(
    145deg,
    var(--background-dark-color),
    var(--sidebar-dark-color)
  );
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.$isVisible ? "0" : "20px")});
  transition: all 0.6s ease;
  border-radius: 15px;
  overflow: hidden;

  @media print {
    max-width: none !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
    box-shadow: none !important;
    background: white !important;
    color: black !important;
    font-size: 11px !important;
    line-height: 1.4 !important;
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
    border-radius: 0 !important;
    page-break-inside: avoid;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  @media (max-width: 768px) {
    margin: 10px;
  }
`;

const Header = styled.header`
  background: linear-gradient(
    120deg,
    rgba(77, 163, 255, 0.18),
    rgba(16, 18, 26, 0.2)
  );
  color: var(--white-color);
  padding: 35px 40px 30px 40px;
  border-bottom: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    width: 14rem;
    height: 14rem;
    border-radius: 50%;
    right: -4rem;
    top: -8rem;
    background: radial-gradient(
      circle,
      rgba(77, 163, 255, 0.35) 0%,
      rgba(77, 163, 255, 0) 72%
    );
    pointer-events: none;
  }

  @media print {
    background: #f8f9fa !important;
    color: black !important;
    padding: 12px 0 12px 0 !important;
    border-bottom: 3px solid #000 !important;
    page-break-after: avoid;
    margin-bottom: 8px !important;
    text-align: center !important;
  }

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const HeaderContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  align-items: start;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    text-align: left;
  }

  @media print {
    grid-template-columns: 1fr !important;
    gap: 8px !important;
    max-width: none !important;
    margin: 0 !important;
    text-align: center !important;
  }
`;

const PersonalInfo = styled.div`
  h1 {
    font-size: 2.6em;
    font-weight: 700;
    margin-bottom: 6px;
    color: var(--white-color);
    letter-spacing: -1px;
    line-height: 1.1;

    @media (max-width: 768px) {
      font-size: 2.2em;
    }

    @media print {
      font-size: 24px !important;
      margin-bottom: 6px !important;
      color: #000 !important;
      font-weight: 700 !important;
      line-height: 1.2 !important;
      letter-spacing: -0.5px !important;
    }
  }

  h2 {
    font-size: 1.1em;
    font-weight: 500;
    color: var(--white-color-2);
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    line-height: 1.3;

    @media print {
      font-size: 12px !important;
      margin-bottom: 8px !important;
      color: #333 !important;
      font-weight: 600 !important;
      letter-spacing: 0.5px !important;
    }
  }
`;

const Tagline = styled.p`
  font-size: 1.1em;
  color: var(--white-color-2);
  font-style: italic;
  line-height: 1.4;
  margin-top: 8px;

  @media print {
    font-size: 0.9em !important;
    margin-top: 4px !important;
    color: #666 !important;
  }
`;

const ContactInfo = styled.div`
  display: grid;
  gap: 8px;
  padding-left: 20px;
  border-left: 3px solid var(--border-color);

  @media print {
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: center !important;
    gap: 8px !important;
    padding: 0 !important;
    border: none !important;
    margin-top: 8px !important;
  }

  @media (max-width: 768px) {
    border-left: none;
    padding-left: 0;
    border-top: 2px solid var(--border-color);
    padding-top: 20px;
    margin-top: 20px;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.85em;
  color: var(--white-color-2);
  transition: color 0.2s ease;
  line-height: 1.3;

  &:hover {
    color: var(--white-color);
  }

  svg {
    width: 14px;
    height: 14px;
    margin-right: 10px;
    color: var(--primary-color);
    flex-shrink: 0;
  }

  span {
    line-height: 1.3;
  }

  @media print {
    font-size: 8px !important;
    line-height: 1.2 !important;
    color: #333 !important;
    margin: 0 6px !important;

    &:hover {
      color: #333 !important;
    }

    svg {
      width: 8px !important;
      height: 8px !important;
      margin-right: 4px !important;
      color: #000 !important;
    }

    &:not(:last-child)::after {
      content: " • ";
      color: #666;
      margin-left: 6px;
    }
  }
`;

const Section = styled.section`
  padding: 25px 40px;
  border-bottom: 1px solid var(--border-color);

  &:last-child {
    border-bottom: none;
  }

  @media print {
    padding: 8px 0 !important;
    margin-bottom: 10px !important;
    page-break-inside: avoid;
    border-bottom: none !important;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.4em;
  font-weight: 600;
  color: var(--white-color);
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 3px solid var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 1px;

  @media print {
    font-size: 12px !important;
    margin-bottom: 6px !important;
    padding-bottom: 2px !important;
    border-bottom: 1px solid #000 !important;
    color: #000 !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
  }
`;

const SectionContent = styled.div`
  font-size: 0.95em;
  line-height: 1.7;
  color: var(--white-color-2);

  p {
    color: var(--white-color-2);
  }

  @media print {
    color: black !important;

    p {
      color: black !important;
    }
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media print {
    gap: 12px !important;
    font-size: 0.85em !important;
  }
`;

const SkillCategory = styled.div`
  margin-bottom: 20px;

  h4 {
    color: var(--white-color);
    margin-bottom: 12px;
    font-weight: 600;
    font-size: 1.05em;
    padding-bottom: 6px;
    border-bottom: 1px solid var(--border-color);
    letter-spacing: 0.5px;

    @media print {
      color: black !important;
    }
  }

  @media print {
    margin-bottom: 12px !important;

    h4 {
      font-size: 0.95em !important;
      margin-bottom: 8px !important;
      padding-bottom: 4px !important;
    }
  }
`;

const SkillsList = styled.div`
  line-height: 1.8;
  color: var(--white-color-2);
  font-size: 0.95em;
  margin-left: 0;

  @media print {
    line-height: 1.6 !important;
    font-size: 0.85em !important;
    color: black !important;
  }
`;

const SkillTag = styled.span<{ $isPrimary?: boolean; $delay?: number }>`
  font-weight: ${(props) => (props.$isPrimary ? "600" : "400")};
  color: ${(props) =>
    props.$isPrimary ? "var(--white-color)" : "var(--white-color-2)"};
  display: inline;
  margin-right: 4px;

  &:not(:last-child)::after {
    content: " • ";
    color: var(--border-color);
    font-weight: normal;
    margin: 0 6px;
  }

  &:last-child::after {
    content: "";
  }

  @media print {
    font-size: 0.85em !important;
    color: ${(props) => (props.$isPrimary ? "black" : "#666")} !important;

    &:not(:last-child)::after {
      margin: 0 4px !important;
      color: #ccc !important;
    }
  }
`;

const ExperienceItem = styled.div`
  margin-bottom: 20px;
  padding: 0;
  border-left: 3px solid var(--primary-color);
  padding-left: 18px;

  @media print {
    margin-bottom: 12px !important;
    padding-left: 12px !important;
    border-left-width: 2px !important;
    break-inside: avoid;
  }
`;

const ExperienceHeader = styled.div`
  margin-bottom: 12px;

  h4 {
    font-size: 1.2em;
    color: var(--white-color);
    font-weight: 600;
    margin: 0 0 4px 0;
    line-height: 1.3;

    @media print {
      color: black !important;
    }
  }

  .meta-info {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    font-size: 0.9em;
    color: var(--white-color-2);

    @media print {
      color: #666 !important;
    }
  }

  @media print {
    margin-bottom: 8px !important;

    h4 {
      font-size: 1.1em !important;
    }

    .meta-info {
      font-size: 0.8em !important;
      gap: 8px !important;
    }
  }

  @media (max-width: 768px) {
    .meta-info {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }
  }
`;

const Company = styled.span`
  color: var(--primary-color);
  font-weight: 600;
  font-size: 1em;
`;

const Location = styled.span`
  color: var(--white-color-2);
  font-size: 0.9em;

  @media print {
    color: #666 !important;
  }
`;

const Duration = styled.span`
  color: var(--white-color-2);
  font-size: 0.9em;
  font-weight: 500;
  background: var(--background-light-color-2);
  padding: 2px 8px;
  border-radius: 12px;

  @media print {
    color: #666 !important;
    background: #f0f0f0 !important;
  }
`;

const TechTags = styled.div`
  margin-top: 12px;
  font-size: 0.9em;
  color: var(--white-color-2);
  line-height: 1.4;

  strong {
    color: var(--white-color);
    font-weight: 600;
  }

  @media print {
    margin-top: 8px !important;
    font-size: 0.8em !important;
    color: #666 !important;

    strong {
      color: #000 !important;
    }
  }
`;

const SkillsUsed = styled.div`
  margin-top: 12px;
  font-size: 0.9em;
  color: var(--white-color-2);

  strong {
    color: var(--white-color);
    font-weight: 600;

    @media print {
      color: black !important;
    }
  }

  @media print {
    margin-top: 8px !important;
    font-size: 0.8em !important;
    color: #666 !important;
  }
`;

const Highlights = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const HighlightItem = styled.div`
  display: flex;
  align-items: center;
  background: var(--background-light-color-2);
  padding: 12px 15px;
  border-radius: 6px;
  border-left: 3px solid var(--primary-color);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(102, 126, 234, 0.15);
  }

  span {
    color: var(--white-color-2);
    font-weight: 500;

    @media print {
      color: #666 !important;
    }
  }

  @media print {
    background: #f8f9ff !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
`;

const HighlightIcon = styled.span`
  color: var(--primary-color);
  margin-right: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 1.15rem;
  }

  @media print {
    color: #333 !important;
  }
`;

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 18px;
  margin-top: 12px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  @media print {
    gap: 10px !important;
    margin-top: 8px !important;
  }
`;

const AchievementItem = styled.div`
  display: grid;
  gap: 0.85rem;
  background: linear-gradient(
    130deg,
    rgba(77, 163, 255, 0.13),
    rgba(77, 163, 255, 0.04)
  );
  padding: 1rem;
  border-radius: 0.95rem;
  border: 1px solid var(--border-color);
  border-top: 3px solid var(--primary-color);
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 24px rgba(77, 163, 255, 0.14);
    border-color: var(--primary-color-light);
  }

  @media print {
    background: #f8f9ff !important;
    padding: 10px !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    border: 1px solid #d6d6d6 !important;
    border-top: 2px solid #333 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    page-break-inside: avoid;
    transform: none !important;

    &:hover {
      transform: none !important;
    }
  }

  @media (max-width: 768px) {
    padding: 0.9rem;
  }
`;

const AchievementHeader = styled.div`
  display: grid;
  grid-template-columns: 2.2rem 1fr;
  gap: 0.7rem;
  align-items: center;
`;

const AchievementIcon = styled.span`
  color: var(--primary-color);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.62rem;
  background: rgba(77, 163, 255, 0.2);
  border: 1px solid rgba(77, 163, 255, 0.34);

  svg {
    font-size: 1.06rem;
  }

  ${AchievementItem}:hover & {
    transform: scale(1.1);
    color: var(--primary-color-light);
  }

  @media print {
    color: #333 !important;
    width: 1.4rem !important;
    height: 1.4rem !important;
    border-radius: 0 !important;
    background: #ededed !important;
    border: 1px solid #ccc !important;

    svg {
      font-size: 0.9rem !important;
    }
  }
`;

const AchievementTitleGroup = styled.div`
  h4 {
    color: var(--white-color);
    margin: 0;
    font-weight: 700;
    font-size: 1.02rem;
    letter-spacing: 0.02rem;

    @media print {
      color: #000 !important;
      font-size: 0.9rem !important;
    }
  }

  p {
    color: var(--font-light-color);
    font-size: 0.82rem;
    margin-top: 0.1rem;
    text-transform: uppercase;
    letter-spacing: 0.05rem;

    @media print {
      color: #555 !important;
      font-size: 0.72rem !important;
      margin-top: 0 !important;
    }
  }
`;

const AchievementList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.55rem;
`;

const AchievementListItem = styled.li`
  border: 1px solid rgba(164, 172, 196, 0.25);
  border-radius: 0.7rem;
  background-color: rgba(16, 18, 26, 0.2);
  padding: 0.65rem 0.7rem;

  @media print {
    border: 1px solid #ddd !important;
    border-radius: 0 !important;
    background: #fff !important;
    padding: 6px !important;
  }
`;

const AchievementItemTitle = styled.p`
  color: var(--white-color);
  font-weight: 600;
  font-size: 0.93rem;
  margin-bottom: 0.28rem;

  @media print {
    color: #000 !important;
    font-size: 0.8rem !important;
    margin-bottom: 2px !important;
  }
`;

const AchievementMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 0.3rem;

  span,
  small {
    font-size: 0.75rem;
    line-height: 1;
    padding: 0.26rem 0.46rem;
    border-radius: 999px;
    background-color: rgba(77, 163, 255, 0.2);
    border: 1px solid rgba(77, 163, 255, 0.3);
    color: var(--white-color);
  }

  @media print {
    margin-bottom: 2px !important;

    span,
    small {
      font-size: 0.68rem !important;
      border-radius: 0 !important;
      border: 1px solid #d3d3d3 !important;
      background: #f4f4f4 !important;
      color: #444 !important;
      padding: 2px 4px !important;
    }
  }
`;

const AchievementDetails = styled.p`
  color: var(--font-light-color);
  font-size: 0.84rem;
  line-height: 1.45;
  margin: 0;

  @media print {
    color: #555 !important;
    font-size: 0.75rem !important;
    line-height: 1.35 !important;
  }
`;

const PDFButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--primary-color);
  color: var(--white-color);
  border: none;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  z-index: 1000;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }

  @media print {
    display: none !important;
  }
`;

const FocusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 12px;

  @media print {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 10px !important;
  }
`;

const FocusCard = styled.article`
  display: grid;
  grid-template-columns: 2.2rem 1fr;
  gap: 10px;
  align-items: start;
  padding: 0.9rem;
  border: 1px solid var(--border-color);
  border-radius: 0.8rem;
  background: linear-gradient(
    125deg,
    rgba(77, 163, 255, 0.12),
    rgba(77, 163, 255, 0.03)
  );
  transition:
    transform 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--primary-color-light);
  }

  @media print {
    background: #f8f9ff !important;
    border: 1px solid #ddd !important;
    border-radius: 0 !important;
    transform: none !important;
    break-inside: avoid;
  }
`;

const FocusContent = styled.div`
  line-height: 1.5;

  h4 {
    color: var(--white-color);
    font-size: 0.96rem;
    margin-bottom: 0.2rem;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
  }

  p {
    color: var(--white-color-2);
    font-size: 0.92rem;
  }

  @media print {
    h4 {
      color: #000 !important;
      font-size: 0.85rem !important;
      margin-bottom: 0.1rem !important;
    }

    p {
      color: #555 !important;
      font-size: 0.8rem !important;
      line-height: 1.35 !important;
      margin: 0 !important;
    }
  }
`;

const FocusIcon = styled.span`
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.6rem;
  background-color: rgba(77, 163, 255, 0.2);
  border: 1px solid rgba(77, 163, 255, 0.35);

  svg {
    font-size: 1.05rem;
  }

  @media print {
    width: 1.3rem !important;
    height: 1.3rem !important;
    border-radius: 0 !important;
    background: #ededed !important;
    border: 1px solid #ccc !important;
    color: #333 !important;
  }
`;

export default CVPage;
