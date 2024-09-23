import styled from "styled-components";

const Skeleton = styled.div`
  background-color: var(--color-grey-300);
  border-radius: 4px;
  margin: 8px 0;
  height: 20px;
  width: ${(props) => props.width || "100%"};
`;

const SkeletonScreen = () => (
  <div>
    <Skeleton width="60%" />
    <Skeleton width="80%" />
    <Skeleton width="40%" />
    {/* Add more skeletons to match the layout */}
  </div>
);

export default SkeletonScreen;
