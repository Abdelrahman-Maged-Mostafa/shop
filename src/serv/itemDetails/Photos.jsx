import { useState } from "react";
import styled from "styled-components";

const StyledPhoto = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column-reverse;
    gap: 30px;
  }
  > div:first-child {
    display: flex;
    gap: 10px;
    flex-direction: column;
    @media screen and (max-width: 767px) {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }

    div {
      width: 100px;
      height: 120px;
      cursor: pointer;
      box-shadow: var(--shadow-md);
      padding: 0 4px 4px;
      border-radius: var(--border-radius-lg);
      border: 1px solid var(--color-grey-400);
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
  > div:last-child {
    width: 100%;
    height: 100%;
    box-shadow: var(--shadow-md);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--border-radius-lg);
    min-width: 300px;
    img {
      height: 100%;
      @media screen and (max-width: 767px) {
        height: 300px;
      }
    }
  }
`;

function Photos({ curItem }) {
  const [photo, setPhoto] = useState(curItem?.images[0]);
  return (
    <StyledPhoto>
      <div>
        {curItem?.images?.map((el, i) => (
          <div
            style={{
              border: photo === el ? "1px solid var(--color-grey-400)" : "none",
            }}
            onClick={() => {
              setPhoto(el);
            }}
            key={i}
          >
            <img src={el} alt={curItem?.name} />
          </div>
        ))}
      </div>
      <div>
        <img src={photo} alt={curItem?.name} />
      </div>
    </StyledPhoto>
  );
}

export default Photos;
