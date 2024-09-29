import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import CardProduct from "../serv/dashboard/CardProduct";
import { useState } from "react";
import Pagination from "../serv/dashboard/Pagination";
import { useSearchContext } from "../context/useSearchBlog";
import { getAllItems } from "../api/items";
import Spinner from "../ui/Spinner";
import CategorySlider from "../serv/dashboard/CategorySlider";
import { useOptions } from "../context/useOptions";
import Offer from "../serv/dashboard/Offers";
import OffersLine from "../serv/dashboard/OffersLine";
import { Helmet, HelmetProvider } from "react-helmet-async";
import DashboardFilter from "./DashboardFilter";
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

function Dashboard() {
  const { initialSEOData, dashboardStyle } = useOptions();
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

  if (isLoading) return <Spinner />;
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{initialSEOData?.homeTitle || "shop"}</title>
          <meta
            name="description"
            content={initialSEOData?.homeDescription || ""}
          />
          <meta name="keywords" content={initialSEOData?.homeKeywords || ""} />
        </Helmet>
      </HelmetProvider>
      {dashboardStyle === "style1" && (
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
      )}
      {dashboardStyle === "style2" && (
        <>
          <Offer />
          <OffersLine />
          <CategorySlider categories={categories} />
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
        </>
      )}
      {dashboardStyle === "style3" && (
        <>
          <Offer />
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
      )}
      {dashboardStyle === "style4" && (
        <>
          <Offer />
          <CategorySlider categories={categories} />
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
        </>
      )}
      {dashboardStyle === "style5" && (
        <>
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
      )}
      {dashboardStyle === "style6" && (
        <>
          <OffersLine />
          <CategorySlider categories={categories} />
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
        </>
      )}
      {(dashboardStyle === "style7" || dashboardStyle === "style8") && (
        <>
          <Offer />
          <OffersLine />
          <DashboardFilter />
        </>
      )}
      {dashboardStyle === "style9" && (
        <>
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
      )}
      {dashboardStyle === "style10" && (
        <>
          <CategorySlider categories={categories} />
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
        </>
      )}
      {(dashboardStyle === "style11" || dashboardStyle === "style12") && (
        <>
          <OffersLine />
          <DashboardFilter />
        </>
      )}
      {(dashboardStyle === "style13" || dashboardStyle === "style14") && (
        <>
          <Offer />
          <DashboardFilter />
        </>
      )}
      {(dashboardStyle === "style15" || dashboardStyle === "style16") && (
        <>
          <DashboardFilter />
        </>
      )}
      {dashboardStyle === "style17" && (
        <>
          <OffersLine />
          <Offer />
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
      )}
      {dashboardStyle === "style18" && (
        <>
          <OffersLine />
          <Offer />
          <CategorySlider categories={categories} />
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
        </>
      )}
      {dashboardStyle === "style19" && (
        <>
          <OffersLine />
          <CategorySlider categories={categories} />
          <Offer />
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
      )}
      {dashboardStyle === "style20" && (
        <>
          <OffersLine />
          <CategorySlider categories={categories} />
          <Offer />
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
        </>
      )}
      {dashboardStyle === "style21" && (
        <>
          <Offer />
          <CategorySlider categories={categories} />
          <OffersLine />
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
      )}
      {dashboardStyle === "style22" && (
        <>
          <Offer />
          <CategorySlider categories={categories} />
          <OffersLine />
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
        </>
      )}
      {dashboardStyle === "style23" && (
        <>
          <CategorySlider categories={categories} />
          <Offer />
          <OffersLine />
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
      )}
      {dashboardStyle === "style24" && (
        <>
          <CategorySlider categories={categories} />
          <Offer />
          <OffersLine />
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
        </>
      )}
      {dashboardStyle === "style25" && (
        <>
          <CategorySlider categories={categories} />
          <OffersLine />
          <Offer />
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
      )}
      {dashboardStyle === "style26" && (
        <>
          <CategorySlider categories={categories} />
          <OffersLine />
          <Offer />
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
        </>
      )}
      {dashboardStyle === "style27" && (
        <>
          <CategorySlider categories={categories} />
          <Offer />
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
      )}
      {dashboardStyle === "style28" && (
        <>
          <CategorySlider categories={categories} />
          <Offer />
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
        </>
      )}
      {dashboardStyle === "style29" && (
        <>
          <CategorySlider categories={categories} />
          <OffersLine />
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
      )}
      {dashboardStyle === "style30" && (
        <>
          <CategorySlider categories={categories} />
          <OffersLine />
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
        </>
      )}
      {(dashboardStyle === "style31" || dashboardStyle === "style32") && (
        <>
          <OffersLine />
          <Offer />
          <DashboardFilter />
        </>
      )}
    </>
  );
}

export default Dashboard;
