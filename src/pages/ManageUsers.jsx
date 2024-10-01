import styled from "styled-components";
import { motion } from "framer-motion";
import { getAllUsers, updateRole } from "../api/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLogin } from "../context/useLogin";
import Spinner from "../ui/Spinner";
import Pagination from "../serv/dashboard/Pagination";
import { useState } from "react";
import PopUpBanUser from "../serv/account/PopUpBanUser";
import { useOptions } from "../context/useOptions";
import { useOutletContext } from "react-router";
import toast from "react-hot-toast";
import Filter from "../ui/Filter";
import { useSearchParams } from "react-router-dom";
const StyledMode = styled.div`
  .filterUsers {
    position: relative;
    top: -30px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 767px) {
      top: -10px;
    }
    /* margin-bottom: 20px; */
  }
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  padding: 90px 20px 20px 20px;
  position: relative;
  @media screen and (max-width: 767px) {
    padding: 100px 0 0;
  }
  @media screen and (max-width: 500px) {
    padding: 135px 0 0;
  }
`;

const StyledH = styled.h1`
  position: absolute;
  top: 35px;
  left: 0;
  @media screen and (max-width: 767px) {
    top: 50px;
  }
  @media screen and (max-width: 500px) {
    top: 85px;
  }
`;

const Card = styled(motion.div)`
  background: var(--color-grey-0);
  position: relative;
  border-radius: 10px;
  box-shadow: var(--shadow-lg);
  padding: 20px 20px 65px 20px;
  text-align: center;
  &:hover {
    transform: scale(1.05);
  }
`;
const StyledButtons = styled.div`
  position: absolute;
  bottom: 20px;
  right: 0px;
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 20px;
  flex-wrap: wrap;
`;
const TButton = styled.button`
  background: var(--color-brand-500);
  border: none;
  bottom: 10px;
  left: 50%;
  border-radius: 5px;
  color: var(--color-grey-0);
  cursor: pointer;
  padding: 10px 20px;
  &:hover {
    background: var(--color-brand-700);
  }
  &:disabled {
    cursor: no-drop;
  }
`;
const Button = styled.button`
  background: var(--color-red-700);
  border: none;
  bottom: 10px;
  left: 50%;
  border-radius: 5px;
  color: var(--color-grey-0);
  cursor: pointer;
  padding: 10px 20px;
  &:hover {
    background: var(--color-red-800);
  }
  &.banned {
    background: var(--color-grey-500);
    &:hover {
      background: var(--color-grey-700);
    }
  }
  &:disabled {
    cursor: no-drop;
  }
`;
const StyledSearchAndPage = styled.div`
  display: flex;
  position: absolute;
  top: -40px;
  width: 100%;
  align-items: center;
  min-height: 66px;
  flex-direction: row-reverse;
  div {
  }
  @media screen and (max-width: 767px) {
    top: -10px;
  }
  @media screen and (max-width: 500px) {
    flex-direction: column-reverse;
    top: 0px;
    min-height: 91px;
  }
`;
const Input = styled.input`
  margin-right: auto;
  background: var(--color-grey-0);
  border: none;
  border-bottom: 1px solid var(--color-grey-900);
  color: var(--color-grey-900);
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 500px) {
    margin-bottom: auto;
  }
`;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.05 },
};

const ManageUsers = () => {
  const { cookies } = useLogin();
  const { user: curUser } = useOutletContext();
  const [isOpen, onClose] = useState(false);
  const [active, setActive] = useState(false);
  const [page, setPage] = useState(1);
  const [id, setId] = useState("");
  const [search, setSearch] = useState("");
  const { numItems } = useOptions();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { data, isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () => getAllUsers(cookies?.jwt),
  });
  const { isLoading: isUpdated, mutate } = useMutation({
    mutationFn: ({ id, body, token }) => updateRole(id, body, token),
    onSuccess: (val) => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      toast.success("Successful user update");
    },
    onError: (err) => toast.error(err.message),
  });
  const filterValue = searchParams.get("role");
  const numItemInPage = numItems?.numUsersInManageUsersPage;
  const startItem = (page - 1) * numItemInPage;
  const endItem = page * numItemInPage;
  const usersFilter = data?.data?.filter(
    (user) =>
      !user.owner &&
      (user.role === filterValue || !filterValue) &&
      user.email.toLowerCase().includes(search.toLowerCase())
  );
  const users = usersFilter?.slice(startItem, endItem);
  const numPages = Math.ceil(usersFilter?.length / numItemInPage);
  function handleUpdateUser(id, role) {
    mutate({ id, body: { role }, token: cookies.jwt });
  }
  if (isLoading) return <Spinner />;
  return (
    <StyledMode>
      <Filter
        classCss="filterUsers"
        filterField="role"
        options={[
          { value: "", label: "All" },
          { value: "user", label: "user" },
          { value: "managerReviews", label: "Review manager" },
          { value: "managerItems", label: "Item manager" },
          { value: "admin", label: "admin" },
        ]}
      />
      <Container>
        <PopUpBanUser
          isOpen={isOpen}
          onClose={() => onClose(false)}
          token={cookies.jwt}
          id={id}
          banned={!active}
        />
        <StyledSearchAndPage>
          <Pagination
            setPage={setPage}
            page={page}
            numPages={numPages}
            style={{ margin: "15px", position: "relative" }}
          />
          <Input
            type="text"
            placeholder="Search by email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </StyledSearchAndPage>
        <StyledH>All Users ({usersFilter?.length})</StyledH>
        {users.map((user, index) => (
          <Card
            key={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.address}</p>
            <p style={{ textTransform: "capitalize" }}>{user.role}</p>
            <div style={{ height: "200px" }}>
              <StyledButtons>
                <Button
                  onClick={() => {
                    onClose(true);
                    setId(user._id);
                    setActive(user.active);
                  }}
                  disabled={isUpdated}
                  className={user.active ? "" : "banned"}
                >
                  {user.active ? "Ban User" : "Un ban"}
                </Button>
                {curUser.owner && user.role !== "admin" && (
                  <TButton
                    onClick={() => handleUpdateUser(user._id, "admin")}
                    disabled={isUpdated}
                  >
                    Admin
                  </TButton>
                )}
                {curUser.owner && user.role !== "managerItems" && (
                  <TButton
                    onClick={() => handleUpdateUser(user._id, "managerItems")}
                    disabled={isUpdated}
                  >
                    Item Manager
                  </TButton>
                )}
                {curUser.owner && user.role !== "managerReviews" && (
                  <TButton
                    onClick={() => handleUpdateUser(user._id, "managerReviews")}
                    disabled={isUpdated}
                  >
                    Review Manager
                  </TButton>
                )}
                {curUser.owner && user.role !== "user" && (
                  <TButton
                    onClick={() => handleUpdateUser(user._id, "user")}
                    disabled={isUpdated}
                  >
                    User
                  </TButton>
                )}
              </StyledButtons>
            </div>
          </Card>
        ))}
      </Container>
    </StyledMode>
  );
};

export default ManageUsers;
