import { createGlobalStyle } from 'styled-components'

import 'react-toastify/dist/ReactToastify.css'

export const GlobalStyle = createGlobalStyle`
  :root {
    --white: #ffffff;

    --gray_50: #F9FAFB;
    --gray_100: #F3F4F6;
    --gray_400: #9CA3AF;
    --gray_500: #6B7280;
    --gray-800: #1a202c;

    --zinc-500: #71717a;
    --zinc-800: #27272a;
    --zinc-900: #1c1917;
    --zinc-900-50: rgba(24, 24, 27, 0.5);

    --emerald-500: #10b981;

    --green_10: #E4EDEA;
    --green_100: #C6F6D5;
    --green_300: #BEFFB9;
    --green-500: #22C55E;
    --green_700: #152b38;
    --green-800: #166534;
    --green_900: #0B151B;

    --purple_200: #D6BCFA;
    --purple_300: #9EA0C5;
    --purple-500: #a855f7;
    --purple_600: #6B46C1;
    --purple_800: #44337A;

    --yellow-500: #EAB308;
    --yellow-800: #854D0E;

    --blue_300: #9EE7FE;
    --blue_500: #3D94EF;
    --blue_900: #0D2238;

    --cyan-500: #06B6D4;
    --cyan-800: #155e75;

    --rose-500: #f43f5e;
    --rose-600: #E11D48;

    --red_50: #FFF5F5;
    --red_200: #FEB2B2;
    --red-500: #EF4444;

  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--zinc-900);
    color: var(--white);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
    border: 0;
  }

  a {
    text-decoration: none;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  .Toastify__toast--error {
    background: var(--rose-600);
  }

  .Toastify__toast--success {
    background: var(--emerald-500);
  }
`
