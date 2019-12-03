import styled from '@emotion/styled/macro';
import { FC } from 'react';
import React from 'react';

const ButtonStyled = styled('button')<{ small?: boolean }>`
  background: #ffc608;
  border: 1px solid #ffc608;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: 0.12s linear;
  display: inline-block;
  text-align: center;
  color: #000000;

  ${({ small }): string => (small ? 'padding: 5px 10px;' : '')}

  &:hover {
    box-shadow: 0px 0px 0 1px #ffc608;
    text-decoration: none;
  }

  &:disabled {
    background: #f1f1f1;
    border-color: #f1f1f1;
  }
`;

export interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  small?: boolean;
}

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return <ButtonStyled {...props}>{children}</ButtonStyled>;
};
