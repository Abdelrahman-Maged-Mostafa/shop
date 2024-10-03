import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active === "yes" &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;
  @media (max-width: 420px) {
    font-size: 1.3rem;
    flex-direction: column;
  }
  @media (max-width: 390px) {
    font-size: 1.2rem;
  }
  @media (max-width: 375px) {
    font-size: 1rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
function Filter({ filterField, options, classCss = "" }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleClick(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }
  // const [curSearchParams] = useSearchParams();
  const filterValue = searchParams.get(filterField) || options[0].value;

  return (
    <StyledFilter className={classCss}>
      {options.map((option) => (
        <FilterButton
          onClick={() => handleClick(option.value)}
          key={option.value}
          active={option.value === filterValue ? "yes" : ""}
          disabled={option.value === filterValue}
          style={{ textTransform: "capitalize" }}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
