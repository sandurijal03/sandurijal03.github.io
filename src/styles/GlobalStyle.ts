import { createGlobalStyle } from "styled-components";

const GlobalStyled = createGlobalStyle`
  
  /* :root {
    --primary-color: #007bff;
    --primary-color-light: #057fff;
    --secondary-color: #6c757d;
    --background-dark-color:#10121A;
    --background-dark-gray:#191D2B;
    --border-color: #2e344e;
    --background-light-color: #f1f1f1;
    --background-light-color-2: rgba(3,127,255,.3);
    --white-color:#fff;
    --font-light-color:#a4acc4;
    --font-dark-color:#313131;
    --font-dark-color-2:#151515; 
    --sidebar-dark-color: #191D2B;  
    --scrollbar-bg-color: #383838;
    --scrollbar-thumb-color: #6b6b6b;
    --scrollbar-track-color: #383838; 
  } */

  .lightTheme {
    --primary-color: #0060c7;
    --primary-color-light: #0462c9;
    --secondary-color: #c0392b;
    --background-dark-color: #F1F1F1;
    --background-dark-grey: #e4e4e4;
    --border-color: #999;
    --background-light-color: #F1F1F1;
    --background-light-color-2: rgba(3,127,255,.3);
    --white-color: #151515;
    --font-light-color: #313131;
    --font-dark-color: #313131;
    --font-dark-color-2: #151515;
    --sidebar-dark-color: #E4E4E4;
    --scrollbar-bg-color: #383838;
    --scrollbar-thump-color: #6b6b6b;
    --scrollbar-track-color: #383838;

    --resume-hero-gradient-start: rgba(0, 96, 199, 0.08);
    --resume-hero-gradient-end: rgba(255, 255, 255, 0.92);
    --resume-hero-border: rgba(0, 96, 199, 0.2);
    --resume-hero-shadow: 0 0.7rem 1.6rem rgba(0, 96, 199, 0.08);
    --resume-hero-glow-start: rgba(0, 96, 199, 0.22);
    --resume-hero-glow-end: rgba(0, 96, 199, 0);
    --resume-fact-card-bg: rgba(255, 255, 255, 0.88);
    --resume-fact-card-border: rgba(0, 96, 199, 0.18);
    --resume-panel-bg: rgba(255, 255, 255, 0.86);
    --resume-panel-border: rgba(0, 96, 199, 0.18);
    --resume-panel-shadow: 0 0.45rem 1.15rem rgba(0, 0, 0, 0.04);
    --resume-divider-color: rgba(49, 49, 49, 0.14);
    --resume-spotlight-border: rgba(0, 96, 199, 0.28);
    --resume-spotlight-gradient-start: rgba(0, 96, 199, 0.16);
    --resume-spotlight-gradient-end: rgba(0, 96, 199, 0.06);
    --resume-spotlight-label: #0552a7;
    --resume-category-bg: rgba(255, 255, 255, 0.72);
    --resume-category-border: rgba(0, 96, 199, 0.16);
    --resume-category-icon-bg: rgba(0, 96, 199, 0.12);
    --resume-category-icon-border: rgba(0, 96, 199, 0.22);
    --resume-category-icon-color: #0552a7;
    --resume-chip-bg: rgba(241, 241, 241, 0.9);
    --resume-chip-border: rgba(0, 96, 199, 0.25);
    --resume-chip-featured-border: rgba(0, 96, 199, 0.4);
    --resume-chip-featured-gradient-start: rgba(0, 96, 199, 0.2);
    --resume-chip-featured-gradient-end: rgba(4, 98, 201, 0.1);
    --resume-chip-featured-color: #123f73;
    --resume-chip-hover-border: rgba(0, 96, 199, 0.52);
    --resume-timeline-line: rgba(0, 96, 199, 0.3);
    --resume-timeline-item-bg: rgba(255, 255, 255, 0.9);
    --resume-timeline-item-border: rgba(0, 96, 199, 0.18);
    --resume-timeline-item-hover-border: rgba(0, 96, 199, 0.34);
    --resume-timeline-badge-bg: rgba(0, 96, 199, 0.12);
    --resume-timeline-badge-border: rgba(0, 96, 199, 0.28);
  }

  .darkTheme{
    --primary-color: #4da3ff;
    --primary-color-light: #57a8ff;
    --secondary-color: #8d949e;
    --background-dark-color:#10121A;
    --background-dark-gray:#191D2B;
    --border-color: #464d6a;
    --background-light-color: #f1f1f1;
    --background-light-color-2: rgba(3,127,255,.3);
    --white-color:#fff;
    --font-light-color:#b8bfd4;
    --font-dark-color:#313131;
    --font-dark-color-2:#151515; 
    --sidebar-dark-color: #191D2B;  
    --scrollbar-bg-color: #383838;
    --scrollbar-thumb-color: #6b6b6b;
    --scrollbar-track-color: #383838;

    --resume-hero-gradient-start: rgba(77, 163, 255, 0.14);
    --resume-hero-gradient-end: rgba(16, 18, 26, 0.35);
    --resume-hero-border: var(--border-color);
    --resume-hero-shadow: none;
    --resume-hero-glow-start: rgba(77, 163, 255, 0.35);
    --resume-hero-glow-end: rgba(77, 163, 255, 0);
    --resume-fact-card-bg: rgba(25, 29, 43, 0.8);
    --resume-fact-card-border: var(--border-color);
    --resume-panel-bg: var(--sidebar-dark-color);
    --resume-panel-border: var(--border-color);
    --resume-panel-shadow: none;
    --resume-divider-color: rgba(164, 172, 196, 0.15);
    --resume-spotlight-border: rgba(77, 163, 255, 0.35);
    --resume-spotlight-gradient-start: rgba(77, 163, 255, 0.2);
    --resume-spotlight-gradient-end: rgba(77, 163, 255, 0.05);
    --resume-spotlight-label: var(--primary-color-light);
    --resume-category-bg: rgba(16, 18, 26, 0.35);
    --resume-category-border: rgba(164, 172, 196, 0.2);
    --resume-category-icon-bg: rgba(77, 163, 255, 0.15);
    --resume-category-icon-border: rgba(77, 163, 255, 0.3);
    --resume-category-icon-color: #cde6ff;
    --resume-chip-bg: rgba(16, 18, 26, 0.5);
    --resume-chip-border: rgba(164, 172, 196, 0.35);
    --resume-chip-featured-border: rgba(77, 163, 255, 0.55);
    --resume-chip-featured-gradient-start: rgba(77, 163, 255, 0.2);
    --resume-chip-featured-gradient-end: rgba(77, 163, 255, 0.08);
    --resume-chip-featured-color: #dceeff;
    --resume-chip-hover-border: rgba(77, 163, 255, 0.65);
    --resume-timeline-line: rgba(77, 163, 255, 0.35);
    --resume-timeline-item-bg: rgba(16, 18, 26, 0.55);
    --resume-timeline-item-border: var(--border-color);
    --resume-timeline-item-hover-border: rgba(77, 163, 255, 0.55);
    --resume-timeline-badge-bg: rgba(77, 163, 255, 0.18);
    --resume-timeline-badge-border: rgba(77, 163, 255, 0.35);
  }



  * {
    padding:0;
    margin:0;
    box-sizing:border-box;
    list-style: none;
    text-decoration:none;
    font-family: 'Nunito', sans-serif;
    font-size:1.2rem;
  }

  body {
    background-color: var(--background-dark-color);
    color: var(--font-light-color)
  }


  body::-webkit-scrollbar{
    width: 9px;
    background-color: var(--scrollbar-bg-color);
  }

  body::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: var(--scrollbar-thumb-color);
  }


  body::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: var(--scrollbar-track-color);
  }

  a{
    font-family: inherit;
    color:inherit;
    font-size:1rem;
  }

  h1 {
    font-size: 4rem;
    color: var(--white-color);
    span {
      font-size: 4rem; 
      @media screen and (max-width: 502px) {
       font-size: 3rem;
      }
    }
    @media screen and (max-width: 502px) {
      h1 {
        font-size: 3rem;
      }
    }
  }
  span {
    color: var(--primary-color)
  }

  /* floatingn toggler */
  .lightDarkMode {
    position: fixed;
    right: 0;
    top: 50%;
    background-color: var(--background-color-light-2);
    width: 6rem;
    height: 3rem;
    z-index: 15;
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
      display: flex;
      align-items: center;
      font-size: 1.7rem;
      color: var(--white-color);
    }
  }

  /* global media queries */
    .hamburgerMenu {
      position:absolute;
      right:5%;
      top:3%;
      display:none;
      z-index:15;
      svg  {
        font-size :3rem;
      }
    }

    .navToggle {
      transform: translateX(0);
      z-index: 20;
    }


    @media screen and (max-width:1200px)  {
      .hamburgerMenu {
        display:block;
      }
    }



  




`;

export default GlobalStyled;
