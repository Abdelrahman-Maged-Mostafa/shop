import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import CardProduct from "../serv/dashboard/CardProduct";
import { useState } from "react";
import Pagination from "../serv/dashboard/Pagination";
import { useSearchContext } from "../context/useSearchBlog";
import { getAllItems } from "../api/items";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";
import { useLocation } from "react-router-dom";
import FilterSort from "../ui/FilterSort ";
import { useOptions } from "../context/useOptions";
import { sortItems } from "../serv/dashboard/SortFunction";

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

const getPrice = (item) => {
  if (item?.properties?.colors?.length) {
    return item.properties.colors.map((color) => color.price);
  } else if (item?.properties?.colorsAndSize?.length) {
    return item.properties.colorsAndSize.flatMap((color) =>
      Object.values(color.sizes).map((size) => size.price)
    );
  } else if (item?.properties?.sizes?.length) {
    return item.properties.sizes.map((size) => size.price);
  } else {
    return [item.price];
  }
};
const getStock = (item) => {
  let stocks = [];

  if (item?.properties?.colors?.length) {
    stocks = item.properties.colors.map((color) => color.stock);
  } else if (item?.properties?.colorsAndSize?.length) {
    stocks = item.properties.colorsAndSize.flatMap((color) =>
      Object.values(color.sizes).map((size) => size.stock)
    );
  } else if (item?.properties?.sizes?.length) {
    stocks = item.properties.sizes.map((size) => size.stock);
  } else {
    stocks = [item.stock];
  }

  return stocks.some((stock) => stock > 0);
};

const getMinMaxPrice = (items) => {
  let min, max;
  const prices = items?.data?.flatMap((item) => getPrice(item));
  if (prices) {
    min = Math.min(...prices);
    max = Math.max(...prices);
  }
  return [min, max];
};

function DashboardFilter() {
  const { data: items, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: getAllItems,
  });
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("Popularity-asc");
  const { blog } = useSearchContext();
  const query = new URLSearchParams(useLocation().search);
  const { categories, numItems, dashboardStyle } = useOptions();
  //////////////////////

  const [minRealPrice, maxRealPrice] = getMinMaxPrice(items);

  const minPrice = parseFloat(query.get("minPrice")) || 0;
  const maxPrice = parseFloat(query.get("maxPrice")) || Infinity;
  const outOfStockparam = query.get("outOfStock") === "true";

  // Extract categories from query parameters
  const selectedCategories = categories
    .map((category) => category.name)
    .filter((categoryName) => query.get(categoryName) === "true");

  const filterDataBefore = items?.data?.filter((item) => {
    const prices = getPrice(item);
    const outOfStock = getStock(item);
    const matchesPrice = prices.some(
      (price) => price >= minPrice && price <= maxPrice
    );
    const matchesCategory = selectedCategories.some((selectedCategory) =>
      item.category.some((categoryEl) =>
        new RegExp(selectedCategory, "i").test(categoryEl)
      )
    );
    const matchesStock = outOfStockparam ? outOfStock : true;
    if (selectedCategories.length === 0) return matchesPrice && matchesStock;
    return matchesPrice && matchesCategory && matchesStock;
  });
  ////////////////
  const filterDataBlog = filterDataBefore?.filter?.(
    (el) =>
      el.name.toLowerCase().includes(blog.toLowerCase()) ||
      el.shortDescription.toLowerCase().includes(blog.toLowerCase())
  );
  const filterData = sortItems(filterDataBlog, sort);

  const numItemInPage = numItems?.numItemsInCategoryPage;
  const startItem = (page - 1) * numItemInPage;
  const endItem = page * numItemInPage;
  const numPages = Math.ceil(filterData?.length / numItemInPage);
  const myData = filterData?.slice(startItem, endItem);
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
  if (isLoading) return <Spinner />;
  return (
    <>
      <FilterSort
        minRealPrice={minRealPrice}
        maxRealPrice={maxRealPrice}
        sort={sort}
        setSort={setSort}
      />
      {filterData?.length <= 0 && <Empty resource={"items"} />}
      {styleBig.includes(dashboardStyle) ? (
        <StyledDashboard>
          <Pagination
            setPage={setPage}
            page={page}
            numPages={numPages}
            style={{ top: "2px", right: "0px" }}
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
            style={{ top: "2px", right: "0px" }}
          />
          {myData?.map((el, i) => (
            <CardProduct data={el} key={i} index={i} />
          ))}
        </StyledDashboard2>
      )}
    </>
  );
}

export default DashboardFilter;
