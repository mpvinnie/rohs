import { createGlobalStyle } from 'styled-components'

import 'react-toastify/dist/ReactToastify.css'

export const GlobalStyle = createGlobalStyle`
  :root {
    --white: #ffffff;

    --gray_50: #F0F0F0;
    --gray_100: #C7C7C7;
    --gray_500: #666666;

    --green_10: #E4EDEA;
    --green_300: #BEFFB9;
    --green_500: #2DD09E;
    --green_700: #152b38;
    --green_900: #0B151B;

    --purple_300: #9EA0C5;

    --blue_300: #9EE7FE;
    --blue_500: #3D94EF;
    --blue_900: #0D2238;

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
    background: var(--green_900);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
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
`
