import styled from "styled-components";
import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

function FilterAndSortedOrders() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "", label: "All" },
          { value: "underReview", label: "Under review" },
          { value: "completedPayment", label: "Payment Successful" },
        ]}
      />

      <SortBy
        options={[
          { value: "createdAt-desc", label: "Sort by Date (Newest First)" },
          { value: "createdAt-asc", label: "Sort by Date (Oldest First)" },
          { value: "price-asc", label: "Sort by Price (Low to High)" },
          { value: "price-desc", label: "Sort by Price (High to Low)" },
        ]}
      />
    </TableOperations>
  );
}

export default FilterAndSortedOrders;
