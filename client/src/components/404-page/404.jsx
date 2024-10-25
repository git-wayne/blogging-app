import styled from "styled-components";
import { Link } from "react-router-dom";

const ResourceNotFoundPage = () => {
  const Body = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    color: #343a40;
    text-align: center;
    font-family: "Arial", sans-serif;
  `;

  const Title = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 20px;
  `;

  const HomeLink = styled(Link)`
    margin-top: 15px;
    font-size: 1.2rem;
    color: #007bff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  `;

  return (
    <Body>
      <Title>Could not find the requested resource</Title>
      <HomeLink to="/">Go to Home</HomeLink>
    </Body>
  );
};

export default ResourceNotFoundPage;
