import styled from "styled-components";
import data from "../fakeItemsData";
import CardProduct from "../serv/dashboard/CardProduct";

const StyledDashboard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
`;
function Dashboard() {
  const myData = data;
  return (
    <StyledDashboard>
      {myData.map((el, i) => (
        <CardProduct data={el} key={i} />
      ))}
    </StyledDashboard>
  );
}

export default Dashboard;
