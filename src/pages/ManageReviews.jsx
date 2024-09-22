import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Spinner from "../ui/Spinner";
import { getAllItems } from "../api/items";
import Card from "../serv/manage-items/Card";
import Pagination from "../serv/dashboard/Pagination";
import { useState } from "react";

// Styled components
const StyledAll = styled.div`
  position: relative;
  background-color: var(--color-grey-100);
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  background-color: var(--color-grey-100);
  gap: 10px;
  padding: 20px;
`;

const Fotter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  @media screen and (max-width: 450px) {
    flex-direction: column-reverse;
    gap: 20px;
  }
`;

function ManageReviews({ user }) {
  const { data: items, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: getAllItems,
  });
  const curItems = items?.data?.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  const [page, setPage] = useState(1);
  const numItemInPage = 5;
  const startItem = (page - 1) * numItemInPage;
  const endItem = page * numItemInPage;
  const numPages = Math.ceil(curItems?.length / numItemInPage);
  const myData = curItems?.slice(startItem, endItem);
  if (isLoading) return <Spinner />;
  return (
    <StyledAll>
      <Container>
        {myData.map((item, i) => (
          <Card item={item} key={i} type="review" />
        ))}
      </Container>
      <Fotter>
        <Pagination
          setPage={setPage}
          page={page}
          numPages={numPages}
          style={{
            right: "-15px",
            bottom: "0",
            position: "relative",
          }}
        />
      </Fotter>
    </StyledAll>
  );
}

export default ManageReviews;
