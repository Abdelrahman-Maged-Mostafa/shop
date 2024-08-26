import styled from "styled-components";

const StayledPage = styled.div`
  display: inline-block;
  position: absolute;
  right: 15px;
  button,
  p {
    color: var(--color-grey-900);
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    background-color: var(--color-grey-200);
    transition: background-color 0.3s;
    border: 1px solid var(--color-grey-100);
    margin: 0 4px;
    font-size: 12px; /* Adjust the font size for smaller pagination */
  }

  button:hover {
    background-color: var(--color-grey-400);
  }
  button:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
  }
`;
function Pagination({ top, page, setPage, numPages }) {
  function handelNext() {
    setPage((page) => page + 1);
  }
  function handelBack() {
    setPage((page) => page - 1);
  }
  return (
    <StayledPage style={{ top }}>
      <button onClick={handelBack} disabled={page === 1}>
        &laquo;
      </button>
      <p>{page}</p>
      <button onClick={handelNext} disabled={page === numPages}>
        &raquo;
      </button>
    </StayledPage>
  );
}

export default Pagination;
