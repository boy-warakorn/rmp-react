import styled from "@emotion/styled";
import React from "react";
import ReactLoading from "react-loading";

const Container = styled.div`
  position: fixed;
  margin: auto;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
  background: rgba(192, 192, 192, 0.8);
  width: calc(100% - 275px);
  height: 100%;
`;

const Loading = () => {
  return (
    <>
      <Container>
        <ReactLoading type="spin" color="#fff" height={100} width={100} />
      </Container>
    </>
  );
};

export default Loading;
