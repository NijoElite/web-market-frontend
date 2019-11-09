import styled from "@emotion/styled/macro";
import { mediaMd } from "../../../utils/css.utils";
import React, { FC } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

// #region styled
const StyledInput = styled.input`
  width: 100%;
  heigth: 100%;
  border: none;
  outline: none;
  height: 44px;
  padding-left: 15px;
`;

const SearchFormStyled = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  border: 2px solid #ffc608;
  border-radius: 5px;
  outline: none;

  ${mediaMd} {
    height: auto;
  }
`;

const SearchButtonStyled = styled.button`
  width: 44px;
  height: 44px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  background: none;
  color: #444444;
`;
// #endregion

interface SearchFormProps {
  className?: string;
}

export const SearchForm: FC<SearchFormProps> = ({className}) => {
  return (
  <SearchFormStyled className={className}>
    <StyledInput placeholder='Поиск игр...  '/>
    <SearchButtonStyled>
      <FontAwesomeIcon icon={faSearch}/>
    </SearchButtonStyled>
  </SearchFormStyled>);
} 
