import styled from "@emotion/styled";
import React from "react";
import tw from "twin.macro";

interface CardProps {
  className?: string;
  children: any;
}

const CustomCard = styled.div`
  ${tw`bg-white rounded-lg shadow-md`}
`;

export const FormCard = styled.div`
  ${tw`rounded-sm bg-background shadow-sm p-6`}
`;

const Card = ({ children, className }: CardProps) => {
  return <CustomCard className={className}>{children}</CustomCard>;
};

export default Card;
