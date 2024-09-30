import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../context/useLogin";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";
import { getAllUserTickets } from "../api/tickets";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useOptions } from "../context/useOptions";
import Pagination from "../serv/dashboard/Pagination";
import { useState } from "react";

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
`;

const TicketCard = styled(motion.div)`
  cursor: pointer;
  background: var(--color-grey-0);
  border: 1px solid var(--color-grey-50);
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  width: 300px;
  box-shadow: var(--shadow-lg);
`;

const CardTitle = styled.h2`
  margin: 0 0 10px;
`;

const CardText = styled.p`
  margin: 0;
`;

const CreateButton = styled(motion.button)`
  background: var(--color-brand-500);
  color: var(--color-grey-0);
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 16px;

  &:hover {
    background: var(--color-brand-700);
  }
`;
const StyledP = styled.p`
  text-align: center;
`;

const TicketsPage = () => {
  const { login, cookies } = useLogin();
  const { initialSEOData, numItems } = useOptions();
  const { data: ticketsData, isLoading } = useQuery({
    queryKey: ["tickets"],
    queryFn: () => getAllUserTickets(cookies.jwt),
    enabled: !!cookies.jwt,
  });
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const numItemInPage = numItems?.numTicketsInPage;
  const startItem = (page - 1) * numItemInPage;
  const endItem = page * numItemInPage;
  const numPages = Math.ceil(ticketsData?.data?.length / numItemInPage);
  const tickets = ticketsData?.data?.slice(startItem, endItem);

  if (!cookies?.jwt)
    return <StyledP>Please Login to see your tickets.</StyledP>;
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
          <Link key={ticket._id} to={`/customerServies/${ticket._id}`}>
            <TicketCard whileHover={{ scale: 1.05 }}>
              <CardTitle>{ticket.title}</CardTitle>
              <CardText>Created At: {formatDate(ticket.createdAt)}</CardText>
            </TicketCard>
          </Link>
        ))
      )}
      <CreateButton
        whileHover={{ scale: 1.1 }}
        onClick={() => navigate("/customerServies/new")}
      >
        Create Ticket
      </CreateButton>
    </PageContainer>
  );
};
export default TicketsPage;
