import styled from "styled-components";

const StyledContainer = styled.div`
  /* src/App.css */
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .sidebar {
    width: 100%;
    background-color: var(--color-brand-900);
    padding: 20px;
    text-align: center;
    max-height: 102px;
    overflow: hidden;
    margin-bottom: 20px;
    border-radius: 0 0 9px 9px;
  }

  .sidebar a {
    display: block;
    margin-bottom: 15px;
    text-decoration: none;
    color: var(--color-brand-50);
    padding: 10px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
    svg {
      margin-right: 4px;
    }
  }

  .sidebar a.active,
  .sidebar a:hover {
    background-color: var(--color-brand-800);
  }

  .content {
    flex: 1;
    background-color: var(--color-grey-0);
    padding: 15px;
  }

  .form-section {
    margin-bottom: 30px;
    background-color: var(--color-grey-100);
    padding: 20px;
    border-radius: 8px;
    box-shadow: var(--shadow-md);
  }

  .form-section h2 {
    margin-bottom: 20px;
    color: var(--color-grey-900);
  }

  .form-section input {
    display: block;
    margin-bottom: 15px;
    padding: 10px;
    width: 100%;
    border: none;
    border-bottom: 1px solid var(--color-grey-900);
    background-color: transparent;
    box-sizing: border-box;
    &::placeholder {
      color: var(--color-grey-600);
    }
    &:focus {
      outline: none;
    }
  }

  .form-section button {
    padding: 10px 20px;
    background-color: var(--color-brand-500);
    color: var(--color-grey-0);
    border: none;
    border-radius: 4px;
    width: 180px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .form-section button:hover {
    background-color: var(--color-brand-700);
  }

  @media (min-width: 768px) {
    flex-direction: row;

    .sidebar {
      width: 250px;
      text-align: left;
      max-height: 10000px;
      margin-bottom: 0;
      border-radius: 0 0 0 0;
    }

    .content {
      padding: 40px;
    }
  }

  @media (min-width: 1024px) {
    .sidebar {
      width: 300px;
      padding: 30px;
    }

    .sidebar a {
      font-size: 1.1em;
      padding: 15px;
    }

    .content {
      padding: 60px;
    }

    .form-section {
      padding: 30px;
    }

    .form-section h2 {
      font-size: 1.5em;
    }

    .form-section input {
      padding: 15px;
      font-size: 1.1em;
    }

    .form-section button {
      padding: 15px 30px;
      font-size: 1.1em;
      width: 210px;
    }
  }
`;

export default StyledContainer;
