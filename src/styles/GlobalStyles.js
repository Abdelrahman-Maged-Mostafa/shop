import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--color-grey-200);
    }
  }
  :root {
    /* Indigo */
    
    --border-radius-tiny: 3px;
    --border-radius-sm: 5px;
    --border-radius-md: 7px;
    --border-radius-lg: 9px;
    
    &, &.light-mode {
      --color-brand-50: ${(props) => props.colors.light?.brand50};
      --color-brand-100: ${(props) => props.colors.light?.brand100};
      --color-brand-200: ${(props) => props.colors.light?.brand200};
      --color-brand-500: ${(props) => props.colors.light?.brand500};
      --color-brand-600: ${(props) => props.colors.light?.brand600};
      --color-brand-700: ${(props) => props.colors.light?.brand700};
      --color-brand-800: ${(props) => props.colors.light?.brand800};
      --color-brand-900: ${(props) => props.colors.light?.brand900};
      /* Grey */
      --color-grey-0: ${(props) => props.colors.light?.grey0};
      --color-grey-50: ${(props) => props.colors.light?.grey50};
      --color-grey-100: ${(props) => props.colors.light?.grey100};
      --color-grey-200: ${(props) => props.colors.light?.grey200};
      --color-grey-300: ${(props) => props.colors.light?.grey300};
      --color-grey-400: ${(props) => props.colors.light?.grey400};
      --color-grey-500: ${(props) => props.colors.light?.grey500};
      --color-grey-600: ${(props) => props.colors.light?.grey600};
      --color-grey-700: ${(props) => props.colors.light?.grey700};
      --color-grey-800: ${(props) => props.colors.light?.grey800};
      --color-grey-900: ${(props) => props.colors.light?.grey900};
      
      --color-blue-100: ${(props) => props.colors.light?.blue100};
      --color-blue-700: ${(props) => props.colors.light?.blue700};
      --color-green-100: ${(props) => props.colors.light?.green100};
      --color-green-700: ${(props) => props.colors.light?.green700};
      --color-yellow-100: ${(props) => props.colors.light?.yellow100};
      --color-yellow-700: ${(props) => props.colors.light?.yellow700};
      --color-silver-100: ${(props) => props.colors.light?.silver100};
      --color-silver-700: ${(props) => props.colors.light?.silver700};
      --color-indigo-100: ${(props) => props.colors.light?.indigo100};
      --color-indigo-700: ${(props) => props.colors.light?.indigo700};
  
      --color-red-100: ${(props) => props.colors.light?.red100};
      --color-red-700: ${(props) => props.colors.light?.red700};
      --color-red-800: ${(props) => props.colors.light?.red800};
      
      --backdrop-color: rgba(255, 255, 255, 0.1);
      
      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
      --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
      --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
  
      --image-grayscale: 0;
      --image-opacity: 100%;
    }
    
    &.dark-mode {
      --color-brand-50: ${(props) => props.colors.dark?.brand50};
      --color-brand-100: ${(props) => props.colors.dark?.brand100};
      --color-brand-200: ${(props) => props.colors.dark?.brand200};
      --color-brand-500: ${(props) => props.colors.dark?.brand500};
      --color-brand-600: ${(props) => props.colors.dark?.brand600};
      --color-brand-700: ${(props) => props.colors.dark?.brand700};
      --color-brand-800: ${(props) => props.colors.dark?.brand800};
      --color-brand-900: ${(props) => props.colors.dark?.brand900};
      --color-grey-0: ${(props) => props.colors.dark?.grey0};
      --color-grey-50: ${(props) => props.colors.dark?.grey50};
      --color-grey-100: ${(props) => props.colors.dark?.grey100};
      --color-grey-200: ${(props) => props.colors.dark?.grey200};
      --color-grey-300: ${(props) => props.colors.dark?.grey300};
      --color-grey-400: ${(props) => props.colors.dark?.grey400};
      --color-grey-500: ${(props) => props.colors.dark?.grey500};
      --color-grey-600: ${(props) => props.colors.dark?.grey600};
      --color-grey-700: ${(props) => props.colors.dark?.grey700};
      --color-grey-800: ${(props) => props.colors.dark?.grey800};
      --color-grey-900: ${(props) => props.colors.dark?.grey900};
  
      --color-blue-100: ${(props) => props.colors.dark?.blue100};
      --color-blue-700: ${(props) => props.colors.dark?.blue700};
      --color-green-100: ${(props) => props.colors.dark?.green100};
      --color-green-700: ${(props) => props.colors.dark?.green700};
      --color-yellow-100: ${(props) => props.colors.dark?.yellow100};
      --color-yellow-700: ${(props) => props.colors.dark?.yellow700};
      --color-silver-100: ${(props) => props.colors.dark?.silver100};
      --color-silver-700: ${(props) => props.colors.dark?.silver700};
      --color-indigo-100: ${(props) => props.colors.dark?.indigo100};
      --color-indigo-700: ${(props) => props.colors.dark?.indigo700};
  
      --color-red-100: ${(props) => props.colors.dark?.red100};
      --color-red-700: ${(props) => props.colors.dark?.red700};
      --color-red-800: ${(props) => props.colors.dark?.red800};
  
      --backdrop-color: rgba(0, 0, 0, 0.3);
  
      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
      --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
      --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);
  
      --image-grayscale: 10%;
      --image-opacity: 90%;
    }

  }



  
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  
    /* Creating animations for dark mode */
    transition: background-color 0.3s, border 0.3s;
  }

  html {
    font-size: 62.5%;
  }
  
  body {
    font-family: "Poppins", sans-serif;
    color: var(--color-grey-700);
    transition: color 0.3s, background-color 0.3s;
    min-height: 100vh;
    line-height: 1.5;
    font-size: 1.6rem;
  }
  
  input,
  button,
  textarea,
  select {
    font: inherit;
    color: inherit;
  }
  
  button {
    cursor: pointer;
  }
  
  *:disabled {
    cursor: not-allowed;
  }
  
  select:disabled,
  input:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
  }
  
  input:focus,
  button:focus,
  textarea:focus,
  select:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: -1px;
  }
  
  /* Parent selector, finally 😃 */
  button:has(svg) {
    line-height: 0;
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  ul {
    list-style: none;
  }
  
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
    hyphens: auto;
  }
  
  img {
    max-width: 100%;
  
    /* For dark mode */
    filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
  }

  h1, h2, h3, h4, h5, h6, p {
  margin: 0;
}
html, body {
  margin: 0;
  padding: 0;
}

  `;
export default GlobalStyles;
