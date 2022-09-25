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
    --gray_900_transparent_60: rgba(17, 24, 39, 0.6);

    --zinc-500: #71717a;
    --zinc-800: #27272a;
    --zinc-900: #1c1917;

    --emerald-500: #10b981;

    --green_10: #E4EDEA;
    --green_100: #C6F6D5;
    --green_300: #BEFFB9;
    --green_500: #2DD09E;
    --green_700: #152b38;
    --green_900: #0B151B;

    --purple_200: #D6BCFA;
    --purple_300: #9EA0C5;
    --purple-500: #a855f7;
    --purple_600: #6B46C1;
    --purple_800: #44337A;

    --blue_300: #9EE7FE;
    --blue_500: #3D94EF;
    --blue_900: #0D2238;

    --rose-600: #E11D48;

    --red_50: #FFF5F5;
    --red_200: #FEB2B2;
    --red_300: #FFC7C7;
    --red_500: #E53E3E;

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
    background: #E11D48;
  }
`
