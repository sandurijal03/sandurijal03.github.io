import * as React from "react";
import styled from "styled-components";
import GitHub from "@mui/icons-material/GitHub";
import LaunchRounded from "@mui/icons-material/LaunchRounded";
import Title from "../components/Title";
import { InnerLayout, MainLayout } from "../styles/Layouts";
import portfolios from "../data/portfolios";

const categories = ["All", ...new Set(portfolios.map((item) => item.category))];

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = React.useState("All");

  const categoryCounts = React.useMemo(() => {
    return portfolios.reduce<Record<string, number>>((accumulator, item) => {
      accumulator[item.category] = (accumulator[item.category] || 0) + 1;
      return accumulator;
    }, {});
  }, []);

  const filteredProjects = React.useMemo(() => {
    if (activeCategory === "All") {
      return portfolios;
    }

    return portfolios.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <MainLayout>
      <PortfolioPageStyled>
        <Title title={"Portfolio"} span={"Portfolio"} />
        <InnerLayout>
          <HeaderPanel>
            <HeaderCopy>
              <h4>Selected Work</h4>
              <p>
                Product-minded projects across front-end experiences, API-driven
                systems, and practical automation tools.
              </p>
            </HeaderCopy>
            <HeaderStats>
              <StatCard>
                <strong>{portfolios.length}</strong>
                <span>Total Projects</span>
              </StatCard>
              <StatCard>
                <strong>{filteredProjects.length}</strong>
                <span>Visible Projects</span>
              </StatCard>
              <StatCard>
                <strong>{categories.length - 1}</strong>
                <span>Tech Categories</span>
              </StatCard>
            </HeaderStats>
          </HeaderPanel>

          <FiltersWrap>
            {categories.map((category) => (
              <FilterPill
                key={category}
                $active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                <p>{category}</p>
                <span>
                  {category === "All"
                    ? portfolios.length
                    : categoryCounts[category]}
                </span>
              </FilterPill>
            ))}
          </FiltersWrap>

          <ProjectsGrid>
            {filteredProjects.map((item) => (
              <ProjectCard key={item.id}>
                <ProjectImage>
                  <img src={item.image} alt={item.title} />
                  <ImageOverlay data-overlay="true">
                    <CategoryTag>{item.category}</CategoryTag>
                    <ProjectActions>
                      <ActionButton
                        href={item.link1}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${item.title} source on GitHub`}
                      >
                        <GitHub />
                        Source
                      </ActionButton>
                      <ActionButton
                        href={item.link2}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${item.title} live preview`}
                      >
                        <LaunchRounded />
                        Preview
                      </ActionButton>
                    </ProjectActions>
                  </ImageOverlay>
                </ProjectImage>
                <ProjectBody>
                  <h5>{item.title}</h5>
                  <p>
                    {item.text ||
                      `Built under ${item.category} with a focus on clean UX, maintainable code, and production-ready structure.`}
                  </p>
                </ProjectBody>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        </InnerLayout>
      </PortfolioPageStyled>
    </MainLayout>
  );
};

const PortfolioPageStyled = styled.section``;

const HeaderPanel = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  gap: 1.15rem;
  margin-bottom: 1.5rem;

  @media screen and (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const HeaderCopy = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  padding: 1.4rem;
  background: linear-gradient(
    125deg,
    rgba(77, 163, 255, 0.16),
    rgba(16, 18, 26, 0.18)
  );

  h4 {
    color: var(--white-color);
    font-size: 1.5rem;
    margin-bottom: 0.55rem;
  }

  p {
    color: var(--font-light-color);
    line-height: 1.65;
    font-size: 0.98rem;
    max-width: 44rem;
  }
`;

const HeaderStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;

  @media screen and (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 0.9rem;
  padding: 1rem 0.95rem;
  background-color: var(--sidebar-dark-color);
  display: grid;
  gap: 0.3rem;

  strong {
    color: var(--white-color);
    font-size: 1.3rem;
    line-height: 1;
  }

  span {
    color: var(--font-light-color);
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 0.04rem;
  }
`;

const FiltersWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-bottom: 1.3rem;
`;

const FilterPill = styled.button<{ $active: boolean }>`
  border: 1px solid
    ${(props) =>
      props.$active ? "var(--primary-color)" : "var(--border-color)"};
  background: ${(props) =>
    props.$active
      ? "linear-gradient(125deg, var(--primary-color), var(--primary-color-light))"
      : "var(--sidebar-dark-color)"};
  color: ${(props) => (props.$active ? "#ffffff" : "var(--white-color)")};
  padding: 0.52rem 0.9rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: var(--primary-color-light);
  }

  p {
    font-size: 0.86rem;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    font-weight: 700;
  }

  span {
    font-size: 0.78rem;
    padding: 0.2rem 0.45rem;
    border-radius: 999px;
    background-color: ${(props) =>
      props.$active ? "rgba(255, 255, 255, 0.2)" : "rgba(77, 163, 255, 0.18)"};
    color: inherit;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.35rem;

  @media screen and (max-width: 1120px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.article`
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  overflow: hidden;
  background-color: var(--sidebar-dark-color);
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--primary-color-light);
    box-shadow: 0 1rem 2.2rem rgba(0, 0, 0, 0.18);
  }
`;

const ProjectImage = styled.div`
  position: relative;
  height: 14.5rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.04);
  }

  &:hover [data-overlay="true"] {
    opacity: 1;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.25s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.8rem;
  background: linear-gradient(
    to top,
    rgba(16, 18, 26, 0.88),
    rgba(16, 18, 26, 0.2)
  );
`;

const CategoryTag = styled.span`
  align-self: flex-start;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.05rem;
  text-transform: uppercase;
  color: #ffffff;
  background-color: rgba(77, 163, 255, 0.88);
  border-radius: 999px;
  padding: 0.32rem 0.62rem;
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const ActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.14);
  color: #ffffff;
  font-size: 0.74rem;
  font-weight: 700;
  padding: 0.34rem 0.62rem;
  letter-spacing: 0.02rem;

  svg {
    font-size: 1rem;
  }
`;

const ProjectBody = styled.div`
  padding: 1rem 1rem 1.1rem;

  h5 {
    color: var(--white-color);
    font-size: 1.06rem;
    line-height: 1.35;
    margin-bottom: 0.45rem;
  }

  p {
    color: var(--font-light-color);
    font-size: 0.9rem;
    line-height: 1.55;
  }
`;

export default PortfolioPage;
