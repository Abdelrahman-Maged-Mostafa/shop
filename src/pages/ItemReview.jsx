import { useParams } from "react-router-dom";
import styled from "styled-components";
import Rating from "../serv/itemDetails/Rating";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteOneReview, getOneItems } from "../api/items";
import Spinner from "../ui/Spinner";
import toast from "react-hot-toast";
import { useLogin } from "../context/useLogin";

const Bar = styled.div`
  margin-bottom: 40px;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  gap: 10px;
  > p {
    color: var(--color-grey-500);
    border-bottom: 1px solid var(--color-grey-500);
    font-weight: bold;
    &:hover,
    &.active {
      color: var(--color-grey-900);
      border-bottom-color: var(--color-grey-900);
    }
  }
`;

function ItemReview() {
  const { itemId } = useParams();
  const queryClient = useQueryClient();
  const { cookies } = useLogin();
  const { data: item, isLoading } = useQuery({
    queryKey: ["item", itemId],
    queryFn: () => getOneItems(itemId),
  });
  const { isLoading: isDeleted, mutate } = useMutation({
    mutationFn: ({ id, token }) => deleteOneReview(id, token),
    onSuccess: (val) => {
      toast.success("Review successfully deleted.");
      queryClient.invalidateQueries({ queryKey: ["item", itemId] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const curItem = item?.data?.doc;
  function handleDeleteReview(id) {
    mutate({ id, token: cookies.jwt });
  }
  if (isLoading) return <Spinner />;
  return (
    <>
      <Bar>
        <p className="active">Rating & Reviews</p>
      </Bar>
      <Rating
        reviews={curItem?.reviews}
        top="-40px"
        deleted={handleDeleteReview}
        isDeleted={isDeleted}
      />
    </>
  );
}

export default ItemReview;
