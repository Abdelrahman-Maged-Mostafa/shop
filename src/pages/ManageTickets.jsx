import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { useLogin } from "../context/useLogin";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";
import { getAllAdminTickets } from "../api/tickets";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useOptions } from "../context/useOptions";
import Pagination from "../serv/dashboard/Pagination";
import { useState } from "react";
import Filter from "../ui/Filter";

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
  @media screen and (max-width: 450px) {
    padding: 40px 0 0 0;
  }
`;

const TicketCard = styled(motion.div)`
  cursor: pointer;
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-50);
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  min-width: 200px;
  width: 100%;
  box-shadow: var(--shadow-lg);
  @media screen and (max-width: 450px) {
    display: block;
  }
`;

const CardTitle = styled.h2`
  margin: 0 0 10px;
`;

const CardText = styled.p`
  margin: 0;
`;

const StyledP = styled.p`
  text-align: center;
`;

const ManageTickets = () => {
  const { cookies } = useLogin();
  const [searchParams] = useSearchParams();
  const { initialSEOData, numItems } = useOptions();
  const { data: ticketsData, isLoading } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => getAllAdminTickets(cookies.jwt),
    enabled: !!cookies.jwt,
    refetchInterval: 3000, // Refetch every 5 seconds
  });
  const filterValueTitle = searchParams.get("title") || "";
  const filterValueReplay = searchParams.get("replay") || "";

  const [page, setPage] = useState(1);
  const dataFiltred = ticketsData?.data?.filter(
    (tic) =>
      tic.title.includes(filterValueTitle) &&
      (tic.replay === filterValueReplay || filterValueReplay === "")
  );
  const numItemInPage = numItems?.numTicketsInPage;
  const startItem = (page - 1) * numItemInPage;
  const endItem = page * numItemInPage;
  const numPages = Math.ceil(dataFiltred?.length / numItemInPage);
  const tickets = dataFiltred?.slice(startItem, endItem);
  if (!cookies.jwt) return <StyledP>Please Login to see your tickets.</StyledP>;
  if (isLoading) return <Spinner />;
  return (
    <PageContainer>
      <HelmetProvider>
        <Helmet>
          <title>{initialSEOData?.customerServiceTitle || "shop"}</title>
          <meta
            name="description"
            content={initialSEOData?.customerServiceDescription || ""}
          />
          <meta
            name="keywords"
            content={initialSEOData?.customerServiceKeywords || ""}
          />
        </Helmet>
      </HelmetProvider>
      <Filter
        filterField="title"
        options={[
          { value: "", label: "All" },
          { value: "Payment Method Problem", label: "Payment" },
          { value: "User Problem", label: "User" },
          { value: "Order Problem", label: "Order" },
          { value: "Other", label: "Other" },
        ]}
      />
      <Filter
        filterField="replay"
        options={[
          { value: "", label: "All" },
          { value: "true", label: "Replay" },
          { value: "false", label: "Not replay" },
        ]}
      />

      <Pagination
        setPage={setPage}
        page={page}
        numPages={numPages}
        style={{ top: "-10px" }}
      />
      {!tickets || tickets?.length === 0 ? (
        <Empty resource={"tickets"} />
      ) : (
        tickets.map((ticket) => (
          <Link key={ticket._id} to={`/account/manage-tickets/${ticket._id}`}>
            <TicketCard whileHover={{ scale: 1.05 }}>
              <CardTitle>{ticket.title}</CardTitle>
              <CardTitle>From : {ticket?.user?.email}</CardTitle>
              <CardText>Created At: {formatDate(ticket.createdAt)}</CardText>
            </TicketCard>
          </Link>
        ))
      )}
    </PageContainer>
  );
};

export default ManageTickets;
