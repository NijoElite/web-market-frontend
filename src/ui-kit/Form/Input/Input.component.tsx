import styled from "@emotion/styled/macro";
import React, { FC } from 'react';

// #region styled
const LabelStyled = styled.label`
  position: absolute;
  font-size: 16px;
  color: #2b2b2b;
  pointer-events: none;
  left: 5px;
  top: -25px;
  line-height: 35px;
  transition: all 0.15s ease;
`;

const InputWrapperStyled = styled('div')<{isValid?: boolean; error?: string}>`
  transition: all 0.3s ease;
  position: relative;
  margin-bottom: 40px;

  &:after {
    content: '${({error}): string => error || '‏‏‎ ‎'}';
    font-size: 11px;
    color: #000;
    box-sizing: border-box;
    padding-left: 5px;
    border-top: 2px solid ${({isValid}): string => isValid ? '#ffc608' : '#ff0000'};
    width: 100%;
    display: block;
    min-height: 5px;
    transition: all 0.3s ease;
  }
`;

const InputStyled = styled.input`
  box-shadow: none;
  border-radius: 5px;
  padding: 5px;
  outline: none;
  border: none;
  width: 100%;
  border: 2px solid ffc608
`;
// #endregion


type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {isValid?: boolean; errorMessage?: string; labelText?: string};

export const Input: FC<InputProps> = (props) => {
  return (<InputWrapperStyled isValid={props.isValid} error={props.errorMessage}>
    <LabelStyled htmlFor={props.name}>{props.labelText}</LabelStyled>
    <InputStyled {...props}/>
  </InputWrapperStyled>);
}
