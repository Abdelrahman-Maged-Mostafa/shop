import styled from "styled-components";
import data from "../fakeItemsData";
import CardProduct from "../serv/dashboard/CardProduct";
import { useState } from "react";
import Pagination from "../serv/dashboard/Pagination";
import { useSearchContext } from "../context/useSearchBlog";

const StyledDashboard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
  padding: 40px 0;
  position: relative;
`;
function Dashboard() {
  const [page, setPage] = useState(1);
  const { blog } = useSearchContext();
  const filterData = data.filter(
    (el) =>
      el.name.toLowerCase().includes(blog.toLowerCase()) ||
      el.shortDescription.toLowerCase().includes(blog.toLowerCase())
  );
  const numItemInPage = 10;
  const startItem = (page - 1) * numItemInPage;
  const endItem = page * numItemInPage;
  const numPages = Math.ceil(filterData.length / numItemInPage);
  const myData = filterData.slice(startItem, endItem);

  return (
    <StyledDashboard>
      <Pagination
        setPage={setPage}
        page={page}
        numPages={numPages}
        top="-10px"
      />
      {myData.map((el, i) => (
        <CardProduct data={el} key={i} />
      ))}
    </StyledDashboard>
  );
}

export default Dashboard;
