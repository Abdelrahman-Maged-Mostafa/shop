import styled from "styled-components";
import { motion } from "framer-motion";
import { useOptions } from "../context/useOptions";
import { HelmetProvider, Helmet } from "react-helmet-async";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
`;

const Paragraph = styled(motion.p)`
  font-size: 1.2em;
  margin: 20px 0;
  max-width: 800px;
  line-height: 1.5;
`;

const AboutUs = () => {
  const { aboutUs, initialSEOData } = useOptions();

  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>{initialSEOData?.aboutTitle || "shop"}</title>
          <meta
            name="description"
            content={initialSEOData?.aboutDescription || ""}
          />
          <meta name="keywords" content={initialSEOData?.aboutKeywords || ""} />
        </Helmet>
      </HelmetProvider>
      <Paragraph
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {aboutUs?.p}
      </Paragraph>
      <Paragraph
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {aboutUs?.pp}
      </Paragraph>
      <Paragraph
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {aboutUs?.ppp}
      </Paragraph>
    </Container>
  );
};

export default AboutUs;
