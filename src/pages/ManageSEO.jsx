import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useOptions } from "../context/useOptions";
import { useLogin } from "../context/useLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSEO } from "../api/option";
import toast from "react-hot-toast";
import SpinnerMini from "../ui/SpinnerMini";

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  @media (max-width: 768px) {
    padding: 0px;
  }
`;

const Card = styled(motion.div)`
  background: var(--color-grey-0);
  border-radius: 10px;
  box-shadow: var(--shadow-lg);
  margin: 20px;
  padding: 20px;
  width: 100%;
  max-width: 500px;
  @media (max-width: 768px) {
    width: 90%;
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid var(--color-grey-400);
  border-radius: 4px;
  width: 100%;
  background-color: var(--color-grey-0);
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid var(--color-grey-400);
  border-radius: 4px;
  width: 100%;
  background-color: var(--color-grey-0);
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: var(--color-brand-500);
  color: var(--color-grey-0);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: var(--color-brand-700);
  }
`;

const initialSEOData = {
  homeTitle: "",
  homeDescription: "",
  homeKeywords: "",
  aboutTitle: "",
  aboutDescription: "",
  aboutKeywords: "",
  customerServiceTitle: "",
  customerServiceDescription: "",
  customerServiceKeywords: "",
  orderActiveTitle: "",
  orderActiveDescription: "",
  orderActiveKeywords: "",
  orderHistoryTitle: "",
  orderHistoryDescription: "",
  orderHistoryKeywords: "",
  personalInfoTitle: "",
  personalInfoDescription: "",
  personalInfoKeywords: "",
  cartTitle: "",
  cartDescription: "",
  cartKeywords: "",
  checkoutTitle: "",
  checkoutDescription: "",
  checkoutKeywords: "",
  wishlistTitle: "",
  wishlistDescription: "",
  wishlistKeywords: "",
  loginTitle: "",
  loginDescription: "",
  loginKeywords: "",
  signupTitle: "",
  signupDescription: "",
  signupKeywords: "",
  forgetPasswordTitle: "",
  forgetPasswordDescription: "",
  forgetPasswordKeywords: "",
};

const ManageSEO = () => {
  const { initialSEOData: realData } = useOptions();
  const [seoData, setSeoData] = useState(realData || initialSEOData);
  const { cookies } = useLogin();
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: ({ body, token }) => updateSEO(body, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["option"] });
      toast.success("New SEO have been successfully set.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeoData({
      ...seoData,
      [name]: value,
    });
  };
  useEffect(() => setSeoData(realData || initialSEOData), [realData]);

  const handleSave = () => {
    mutate({ body: seoData, token: cookies.jwt });
  };

  const renderCard = (page, title, description, keywords) => (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>{page}</Title>
      <Input
        type="text"
        name={title}
        placeholder="Page Title"
        value={seoData[title]}
        onChange={handleChange}
      />
      <TextArea
        name={description}
        placeholder="Page Description"
        value={seoData[description]}
        onChange={handleChange}
      />
      <TextArea
        name={keywords}
        placeholder="Page Keywords"
        value={seoData[keywords]}
        onChange={handleChange}
      />
    </Card>
  );

  return (
    <StyledPage>
      {renderCard("Home Page", "homeTitle", "homeDescription", "homeKeywords")}
      {renderCard(
        "About Page",
        "aboutTitle",
        "aboutDescription",
        "aboutKeywords"
      )}
      {renderCard(
        "Customer Service Page",
        "customerServiceTitle",
        "customerServiceDescription",
        "customerServiceKeywords"
      )}
      {renderCard(
        "Order Active Page",
        "orderActiveTitle",
        "orderActiveDescription",
        "orderActiveKeywords"
      )}
      {renderCard(
        "Order History Page",
        "orderHistoryTitle",
        "orderHistoryDescription",
        "orderHistoryKeywords"
      )}
      {renderCard(
        "Personal Info Page",
        "personalInfoTitle",
        "personalInfoDescription",
        "personalInfoKeywords"
      )}
      {renderCard("Cart Page", "cartTitle", "cartDescription", "cartKeywords")}
      {renderCard(
        "Checkout Page",
        "checkoutTitle",
        "checkoutDescription",
        "checkoutKeywords"
      )}
      {renderCard(
        "Wishlist Page",
        "wishlistTitle",
        "wishlistDescription",
        "wishlistKeywords"
      )}
      {renderCard(
        "Login Page",
        "loginTitle",
        "loginDescription",
        "loginKeywords"
      )}
      {renderCard(
        "Signup Page",
        "signupTitle",
        "signupDescription",
        "signupKeywords"
      )}
      {renderCard(
        "Forget password Page",
        "forgetPasswordTitle",
        "forgetPasswordDescription",
        "forgetPasswordKeywords"
      )}
      <Button onClick={handleSave} disabled={isLoading}>
        {isLoading ? <SpinnerMini /> : "Save Changes"}
      </Button>
    </StyledPage>
  );
};

export default ManageSEO;
