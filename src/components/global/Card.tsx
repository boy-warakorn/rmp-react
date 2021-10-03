import styled from "@emotion/styled";
import React, { CSSProperties } from "react";
import tw from "twin.macro";

interface CardProps {
  className?: string;
  children: any;
  style?: CSSProperties;
}

const CustomCard = styled.div`
  ${tw`bg-white rounded-lg shadow-md`}
`;

export const FormCard = styled.div`
  ${tw`rounded-sm bg-background shadow-sm p-6`}
`;

const Card = ({ children, className, style }: CardProps) => {
  return (
    <CustomCard className={className} style={style}>
      {children}
    </CustomCard>
  );
};

export default Card;
