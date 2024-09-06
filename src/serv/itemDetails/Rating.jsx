import styled from "styled-components";
import StarRating from "../../ui/StarRating";
import Pagination from "../dashboard/Pagination";
import { useState } from "react";

const ReviewCard = styled.div`
  border: 1px solid var(--color-grey-50);
  border-radius: 10px;
  padding: 15px 15px 20px 15px;
  background-color: var(--color-grey-50);
  box-shadow: var(--shadow-lg);
  position: relative;

  .review-name {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .review-text {
    font-size: 1em;
    color: var(--color-grey-800);
    margin-bottom: 10px;
  }

  .review-date {
    position: absolute;
    font-size: 0.8em;
    color: var(--color-grey-500);
    bottom: 5px;
    right: 10px;
  }
`;
const StyledPage = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  position: relative;
`;
const StyledH = styled.h1`
  @media screen and (max-width: 480px) {
    margin-bottom: 50px;
    text-align: center;
  }
`;
function Rating({ reviews }) {
  const [page, setPage] = useState(1);
  const numReviewInPage = 6;
  const startItem = (page - 1) * numReviewInPage;
  const endItem = page * numReviewInPage;
  const reviewsInPage = reviews.slice(startItem, endItem);

  function getFormatDate(dat) {
    const date = new Date(dat);
    return date.toLocaleString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <>
      <StyledH>All Review ({reviews.length})</StyledH>
      <StyledPage>
        <Pagination
          setPage={setPage}
          page={page}
          numPages={Math.ceil(reviews.length / numReviewInPage)}
          style={{ top: "-70px" }}
        />
        {reviewsInPage.map((review, i) => (
          <ReviewCard key={i}>
            <div className="review-name">{review.user.name}</div>
            <StarRating
              size={20}
              defaultRating={review.rating}
              color={"var(--color-yellow-700)"}
            />
            <div className="review-text">{review.review}</div>
            <div className="review-date">
              Posted in {getFormatDate(review.createdAt)}
            </div>
          </ReviewCard>
        ))}
      </StyledPage>
    </>
  );
}

export default Rating;
