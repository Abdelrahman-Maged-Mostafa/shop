import styled from "styled-components";

const StyledColors = styled.div`
  display: flex;
  gap: 10px;
  > p {
    width: 28px;
    height: 28px;
    padding: 4px;
    border-radius: 50%;
    cursor: pointer;
    background: var(--color-grey-0);
    &.active {
      background: var(--color-grey-400);
    }
    > span {
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  }
`;

const StyledSizes = styled.div`
  display: flex;
  gap: 10px;
  > p {
    min-width: 28px;
    height: 28px;
    padding: 4px;
    cursor: pointer;
    background: var(--color-grey-0);
    text-align: center;
    &.active {
      background: var(--color-grey-400);
    }

    > span {
      text-transform: uppercase;
      display: block;
      min-width: 20px;
      height: 20px;
    }
  }
`;

function ColorsAndSizes({ data, setCurColor, setCurSize, curColor, curSize }) {
  return (
    <>
      {data?.colorsAndSize?.length > 0 && (
        <StyledColors>
          {data.colorsAndSize?.map((color, i) => (
            <p
              key={i}
              className={i === curColor ? "active" : ""}
              onClick={() => {
                setCurColor(i);
                setCurSize(0);
              }}
            >
              <span style={{ backgroundColor: color.name }}></span>
            </p>
          ))}
        </StyledColors>
      )}
      {data?.colors?.length > 0 && (
        <StyledColors>
          {data.colors?.map((color, i) => (
            <p
              key={i}
              className={i === curColor ? "active" : ""}
              onClick={() => {
                setCurColor(i);
                setCurSize(0);
              }}
            >
              <span style={{ backgroundColor: color.name }}></span>
            </p>
          ))}
        </StyledColors>
      )}
      {data?.sizes?.length > 0 && (
        <StyledSizes>
          {data?.sizes?.map((size, i) => (
            <p
              key={i}
              className={i === curSize ? "active" : ""}
              onClick={() => setCurSize(i)}
            >
              <span>{size.name}</span>
            </p>
          ))}
        </StyledSizes>
      )}
      {data?.colorsAndSize?.[curColor]?.sizes.length > 0 && (
        <StyledSizes>
          {data?.colorsAndSize?.[curColor]?.sizes.map((size, i) => (
            <p
              key={i}
              className={i === curSize ? "active" : ""}
              onClick={() => setCurSize(i)}
            >
              <span>{size.name}</span>
            </p>
          ))}
        </StyledSizes>
      )}
    </>
  );
}

export default ColorsAndSizes;
