import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Main } from './App';
import GlobalStyled from './styles/GlobalStyle';

createRoot(document.querySelector('#root') as Element).render(
  <React.StrictMode>
    <GlobalStyled />
    <Main />
  </React.StrictMode>,
);
