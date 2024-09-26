import styled from "styled-components";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useOptions } from "../context/useOptions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLogin } from "../context/useLogin";
import { updateNumItems } from "../api/option";
import toast from "react-hot-toast";
import SpinnerMini from "../ui/SpinnerMini";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  margin: auto;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;

  label {
    margin-bottom: 5px;
    font-weight: bold;
  }

  input {
    padding: 10px;
    margin-bottom: 20px;
    border: none;
    border-bottom: 1px solid var(--color-grey-400);
    border-radius: 4px;
    width: 100%;
    background-color: var(--color-grey-0);
    outline: none;
    &:focus {
      outline: none;
    }
  }
`;

const SaveButton = styled(motion.button)`
  padding: 10px 20px;
  font-size: 16px;
  color: var(--color-grey-0);
  background-color: var(--color-brand-500);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 145px;

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

const SettingsNumber = () => {
  const { numItems } = useOptions();
  const { cookies } = useLogin();
  const queryClient = useQueryClient();
  const { handleSubmit, setValue, control } = useForm();
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ body, token }) => updateNumItems(body, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["option"] });
      toast.success("New numbers have been successfully set.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  useEffect(() => {
    Object.keys(numItems || {})?.forEach((key) => {
      setValue(key, numItems[key]);
    });
  }, [numItems, setValue]);

  const onSubmit = (data) => {
    mutate({ body: data, token: cookies.jwt });
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <label htmlFor="numItemsInHomePage">Number of Items in Home Page</label>
        <Controller
          name="numItemsInHomePage"
          control={control}
          defaultValue={numItems?.numItemsInHomePage}
          render={({ field }) => (
            <input type="number" id="numItemsInHomePage" {...field} required />
          )}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="numItemsInCategoryPage">
          Number of Items in Category Page
        </label>
        <Controller
          name="numItemsInCategoryPage"
          control={control}
          defaultValue={numItems?.numItemsInCategoryPage}
          render={({ field }) => (
            <input
              type="number"
              id="numItemsInCategoryPage"
              {...field}
              required
            />
          )}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="numItemsInManageItemsPage">
          Number of Items in Manage Items Page
        </label>
        <Controller
          name="numItemsInManageItemsPage"
          control={control}
          defaultValue={numItems?.numItemsInManageItemsPage}
          render={({ field }) => (
            <input
              type="number"
              id="numItemsInManageItemsPage"
              {...field}
              required
            />
          )}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="numItemsInManageReviewsPage">
          Number of Items in Manage Reviews Page
        </label>
        <Controller
          name="numItemsInManageReviewsPage"
          control={control}
          defaultValue={numItems?.numItemsInManageReviewsPage}
          render={({ field }) => (
            <input
              type="number"
              id="numItemsInManageReviewsPage"
              {...field}
              required
            />
          )}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="numItemsInWishListPage">
          Number of Items in Wish List Page
        </label>
        <Controller
          name="numItemsInWishListPage"
          control={control}
          defaultValue={numItems?.numItemsInWishListPage}
          render={({ field }) => (
            <input
              type="number"
              id="numItemsInWishListPage"
              {...field}
              required
            />
          )}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="numOrderInManageOrdersPage">
          Number of Orders in Manage Orders Page
        </label>
        <Controller
          name="numOrderInManageOrdersPage"
          control={control}
          defaultValue={numItems?.numOrderInManageOrdersPage}
          render={({ field }) => (
            <input
              type="number"
              id="numOrderInManageOrdersPage"
              {...field}
              required
            />
          )}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="numUsersInManageUsersPage">
          Number of Users in Manage Users Page
        </label>
        <Controller
          name="numUsersInManageUsersPage"
          control={control}
          defaultValue={numItems?.numUsersInManageUsersPage}
          render={({ field }) => (
            <input
              type="number"
              id="numUsersInManageUsersPage"
              {...field}
              required
            />
          )}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="numReviewInPage">
          Number of Reviews in Details Item Page
        </label>
        <Controller
          name="numReviewInPage"
          control={control}
          defaultValue={numItems?.numReviewInPage}
          render={({ field }) => (
            <input type="number" id="numReviewInPage" {...field} required />
          )}
        />
      </InputGroup>
      <SaveButton
        type="submit"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={isLoading}
      >
        {isLoading ? <SpinnerMini /> : "Save Changes"}
      </SaveButton>
    </Container>
  );
};

export default SettingsNumber;
