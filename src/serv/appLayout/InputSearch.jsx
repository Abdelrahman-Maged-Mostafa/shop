import { HiSearch } from "react-icons/hi";
import styled from "styled-components";
import Input from "../../ui/Input";
import { useSearchContext } from "../../context/useSearchBlog";
const StyledForm = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  svg {
    position: absolute;
    right: 0;
    user-select: none;
    cursor: pointer;
    font-size: 28px;
    &:hover {
      color: var(--color-brand-600);
    }
  }
`;
function InputSearch() {
  const { setBlog } = useSearchContext();
  return (
    <StyledForm>
      <Input
        type="text"
        placeholder="Search this blog"
        onChange={(e) => setBlog(e.target.value)}
      />
      <HiSearch />
    </StyledForm>
  );
}

export default InputSearch;
