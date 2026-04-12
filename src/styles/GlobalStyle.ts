import { createGlobalStyle } from 'styled-components';

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
