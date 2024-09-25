import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import CardProduct from "../serv/dashboard/CardProduct";
import { useState } from "react";
import Pagination from "../serv/dashboard/Pagination";
import { getAllItems } from "../api/items";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";
import { getMe } from "../api/user";
import { useLogin } from "../context/useLogin";

const StyledDashboard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 25px;
  padding: 40px 0;
  position: relative;
`;

function WishList() {
  const { data: items, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: getAllItems,
  });
  const { cookies } = useLogin();
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getMe(cookies.jwt),
  });
  const [page, setPage] = useState(1);
  //////////////////////
  const filterData = items?.data?.filter((item) =>
    userData?.data?.doc?.wishList?.includes(item._id)
  );

  // Extract categories from query parameters

  ////////////////
  const numItemInPage = 10;
  const startItem = (page - 1) * numItemInPage;
  const endItem = page * numItemInPage;
  const numPages = Math.ceil(filterData?.length / numItemInPage);
  const myData = filterData?.slice(startItem, endItem);

  if (isLoading) return <Spinner />;
  return (
    <>
      {filterData?.length <= 0 && <Empty resource={"items"} />}
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

export default WishList;
