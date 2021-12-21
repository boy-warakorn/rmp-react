import styled from "@emotion/styled";
import React from "react";
import ReactLoading from "react-loading";

const Container = styled.div``;

const Loading = () => {
  return (
    <>
      <Container className="loading">
        <ReactLoading type="spin" color="#fff" height={100} width={100} />
      </Container>
    </>
  );
};

export default Loading;
