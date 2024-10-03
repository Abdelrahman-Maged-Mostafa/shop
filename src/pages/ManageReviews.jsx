import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Spinner from "../ui/Spinner";
import { getAllItems } from "../api/items";
import Card from "../serv/manage-items/Card";
import Pagination from "../serv/dashboard/Pagination";
import { useState } from "react";
import { useOptions } from "../context/useOptions";
import Filter from "../ui/Filter";
import { useSearchParams } from "react-router-dom";

// Styled components
const StyledAll = styled.div`
  position: relative;
  background-color: var(--color-grey-100);
  height: 100%;
  .filter {
    flex-wrap: wrap;
  }
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
  const { numItems, categories } = useOptions();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("category");
  const { data: items, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: getAllItems,
  });
  const curItemsNow = items?.data?.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  const curItems = curItemsNow?.filter((item) => {
    if (!filterValue) {
      return true;
    } else {
      return item.category.includes(filterValue);
    }
  });

  const [page, setPage] = useState(1);
  const numItemInPage = numItems?.numItemsInManageReviewsPage;
  const startItem = (page - 1) * numItemInPage;
  const endItem = page * numItemInPage;
  const numPages = Math.ceil(curItems?.length / numItemInPage);
  const myData = curItems?.slice(startItem, endItem);
  if (isLoading) return <Spinner />;
  return (
    <StyledAll>
      <Filter
        classCss="filter"
        filterField="category"
        options={[
          { value: "", label: "All" },
          ...categories?.map((cat) => {
            return { value: cat.name, label: cat.name };
          }),
        ]}
      />
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
