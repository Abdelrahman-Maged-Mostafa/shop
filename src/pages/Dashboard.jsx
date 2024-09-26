import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import CardProduct from "../serv/dashboard/CardProduct";
import { useState } from "react";
import Pagination from "../serv/dashboard/Pagination";
import { useSearchContext } from "../context/useSearchBlog";
import { getAllItems } from "../api/items";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";
import CategorySlider from "../serv/dashboard/CategorySlider";
import { useOptions } from "../context/useOptions";
import Offer from "../serv/dashboard/Offers";
import OffersLine from "../serv/dashboard/OffersLine";

const StyledDashboard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 25px;
  padding: 40px 0;
  position: relative;
`;

function Dashboard() {
  const { data: items, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: getAllItems,
  });
  const { categories, numItems } = useOptions();

  const [page, setPage] = useState(1);
  const { blog } = useSearchContext();
  const filterData = items?.data
    ?.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    ?.filter((el) => el.category.some((el) => /popular/i.test(el)))
    ?.filter?.(
      (el) =>
        el.name.toLowerCase().includes(blog.toLowerCase()) ||
        el.shortDescription.toLowerCase().includes(blog.toLowerCase())
    );
  const numItemInPage = numItems?.numItemsInHomePage;
  const startItem = (page - 1) * numItemInPage;
  const endItem = page * numItemInPage;
  const numPages = Math.ceil(filterData?.length / numItemInPage);
  const myData = filterData?.slice(startItem, endItem);

  if (filterData?.length <= 0) return <Empty resource={"orders"} />;
  if (isLoading) return <Spinner />;
  return (
    <>
      <Offer />
      <OffersLine />
      <CategorySlider categories={categories} />
      <StyledDashboard>
        <Pagination
          setPage={setPage}
          page={page}
          numPages={numPages}
          style={{ top: "-10px" }}
        />
        {myData?.map((el, i) => (
          <CardProduct data={el} key={i} index={i} />
        ))}
      </StyledDashboard>
    </>
  );
}

export default Dashboard;
