import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import Slider from "react-slider";
import { useOptions } from "../context/useOptions";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  position: relative;
  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 0px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: var(--color-brand-500);
  color: var(--color-grey-0);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: var(--color-brand-700);
  }
  @media (max-width: 768px) {
    flex: 1;
    margin-right: 10px;
    padding: 8px 16px;
  }
`;

const SortOptions = styled.select`
  padding: 10px;
  border-radius: 4px;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-900);
  @media (max-width: 768px) {
    flex: 1;
    font-size: 13px;
  }
`;

const FilterList = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 300px;
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
  box-shadow: var(--shadow-md);
  padding: 20px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  @media (max-width: 768px) {
    width: 200px;
  }
`;

const FilterItem = styled.label`
  margin: 10px 0;
  display: flex;
  align-items: center;
  text-transform: capitalize;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const CloseIcon = styled(FaTimes)`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

const PriceRange = styled(Slider)`
  margin: 20px 0;
  width: 150px;
  .thumb {
    height: 20px;
    width: 20px;
    background-color: var(--color-brand-500);
    border-radius: 50%;
    cursor: pointer;
  }
  .track {
    height: 5px;
    background-color: var(--color-grey-300);
  }
  .track-1 {
    background-color: var(--color-brand-500);
  }
`;

const FilterSort = ({ minRealPrice, maxRealPrice, sort, setSort }) => {
  const { filter: realFilter } = useParams();
  const { categories } = useOptions();
  const location = useLocation();
  const navigate = useNavigate();
  const filterRef = useRef();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const initialPriceRange = useMemo(
    () => [
      Number(params.get("minPrice")) || minRealPrice,
      Number(params.get("maxPrice")) || maxRealPrice,
    ],
    [minRealPrice, maxRealPrice, params]
  );

  const [priceRange, setPriceRange] = useState(initialPriceRange);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = useCallback(
    (filter) => {
      if (params.has(filter)) {
        params.delete(filter);
      } else {
        params.set(filter, true);
      }
      navigate({ search: params.toString() });
    },
    [params, navigate]
  );

  const handlePriceChange = useCallback(
    (value) => {
      setPriceRange(value);
      params.set("minPrice", value[0]);
      params.set("maxPrice", value[1]);
      navigate({ search: params.toString() });
    },
    [params, navigate]
  );

  const handleClickOutside = useCallback((event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setShowFilters(false);
    }
  }, []);

  const updateParams = useCallback(() => {
    if (realFilter) {
      params.set(realFilter, true);
      navigate({ search: params.toString() });
    }
  }, [navigate, realFilter, params]);

  useEffect(() => {
    updateParams();
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
  return (
    <Container>
      <Button onClick={() => setShowFilters(!showFilters)}>Filter</Button>
      <SortOptions onChange={(e) => setSort(e.target.value)}>
        <option value="Popularity-asc">Sort by Popularity</option>
        <option value="Popularity-desc">Sort by Least Popular</option>
        <option value="price-asc">Sort by Price (High to Low)</option>
        <option value="price-desc">Sort by Price (Low to High)</option>
      </SortOptions>
      {showFilters && (
        <FilterList
          ref={filterRef}
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
        >
          <CloseIcon onClick={() => setShowFilters(false)} />
          {categories?.map((cate) => (
            <FilterItem key={cate._id}>
              <Checkbox
                checked={params.get(`${cate.name}`) === "true"}
                type="checkbox"
                onChange={() => handleFilterChange(`${cate.name}`)}
              />
              {cate.name}
            </FilterItem>
          ))}

          <FilterItem
            style={{
              borderTop: "1px solid var(--color-grey-900)",
              marginTop: "15px",
              paddingTop: "5px",
              borderBottom: "1px solid var(--color-grey-900)",
              marginBottom: "15px",
              paddingBottom: "5px",
            }}
          >
            <Checkbox
              checked={!(params.get("outOfStock") === "true")}
              type="checkbox"
              onChange={() => handleFilterChange("outOfStock")}
            />
            Out of stock
          </FilterItem>
          <FilterItem style={{ flexDirection: "column" }}>
            <label>Price Range:</label>
            <PriceRange
              value={priceRange}
              onChange={handlePriceChange}
              min={minRealPrice}
              max={maxRealPrice}
              step={Math.floor((maxRealPrice - minRealPrice) / 50)}
              renderTrack={(props, state) => (
                <div
                  {...props}
                  className={`track ${state.index === 1 ? "track-1" : ""}`}
                  key={`track-${state.index}`} // Ensure unique key
                />
              )}
              renderThumb={(props, state) => (
                <div
                  {...props}
                  className="thumb"
                  key={`thumb-${state.index}`}
                /> // Ensure unique key
              )}
            />

            <div>
              From: ${priceRange[0]} To: ${priceRange[1]}
            </div>
          </FilterItem>
        </FilterList>
      )}
    </Container>
  );
};

export default FilterSort;
