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
import { useOptions } from "../context/useOptions";
import { Helmet, HelmetProvider } from "react-helmet-async";
const StyledP = styled.p`
  text-align: center;
`;
const StyledDashboard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 25px;
  padding: 40px 0;
  position: relative;
`;
const StyledDashboard2 = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 15px;
  padding: 40px 0;
  position: relative;
`;
function WishList() {
  const { data: items, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: getAllItems,
  });
  const { cookies, login } = useLogin();
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getMe(cookies.jwt),
  });
  const [page, setPage] = useState(1);
  const { numItems, initialSEOData, dashboardStyle } = useOptions();
  //////////////////////
  const filterData = items?.data?.filter((item) =>
    userData?.data?.doc?.wishList?.includes(item._id)
  );

  // Extract categories from query parameters
  const styleBig = [
    "style1",
    "style3",
    "style5",
    "style7",
    "style9",
    "style11",
    "style13",
    "style15",
    "style17",
    "style19",
    "style21",
    "style23",
    "style25",
    "style27",
    "style29",
    "style31",
  ];
  ////////////////
  const numItemInPage = numItems?.numItemsInWishListPage;
  const startItem = (page - 1) * numItemInPage;
  const endItem = page * numItemInPage;
  const numPages = Math.ceil(filterData?.length / numItemInPage);
  const myData = filterData?.slice(startItem, endItem);

  if (isLoading) return <Spinner />;
  if (!login || !userData?.data?.doc)
    return <StyledP>Please Login to see your wishlist items.</StyledP>;
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{initialSEOData?.wishlistTitle || "shop"}</title>
          <meta
            name="description"
            content={initialSEOData?.wishlistDescription || ""}
          />
          <meta
            name="keywords"
            content={initialSEOData?.wishlistKeywords || ""}
          />
        </Helmet>
      </HelmetProvider>
      {filterData?.length <= 0 && <Empty resource={"items"} />}
      {styleBig.includes(dashboardStyle) ? (
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
      ) : (
        <StyledDashboard2>
          <Pagination
            setPage={setPage}
            page={page}
            numPages={numPages}
            style={{ top: "-10px" }}
          />
          {myData?.map((el, i) => (
            <CardProduct data={el} key={i} index={i} />
          ))}
        </StyledDashboard2>
      )}
    </>
  );
}

export default WishList;
