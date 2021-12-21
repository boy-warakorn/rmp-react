import styled from "@emotion/styled";
import React, { CSSProperties } from "react";
import tw from "twin.macro";

interface CardProps {
  className?: string;
  children: any;
  style?: CSSProperties;
  onClick?: () => void;
}

const CustomCard = styled.div`
  ${tw`bg-white rounded-lg shadow-md`}
`;

export const FormCard = styled.div`
  ${tw`rounded-sm bg-background shadow-sm p-6`}
`;

const Card = ({ children, className, style, onClick }: CardProps) => {
  return (
    <CustomCard className={className} style={style} onClick={onClick}>
      {children}
    </CustomCard>
  );
};

export default Card;
