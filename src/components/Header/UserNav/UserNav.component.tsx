import React, { FC } from "react";
import styled from "@emotion/styled/macro";
import { mediaMd, linkColor } from "../../../utils/css.utils";
import { UserNavData } from "../HeaderData";
import { Link } from 'react-router-dom';

// #region styled
const UserNavListStyled = styled.ul`
  list-style-type: none;
  display: none;
  justify-content: flex-end;

  & li:not(:first-child) {
    margin-left: 30px;
  }

  ${mediaMd} {
    display: flex;
  }
`; 

const LinkStyled = styled(Link)`
  ${linkColor('#000')}
  text-decoration: none;
  font-size: 14px;
`;
// #endregion

interface UserNavProps {
  className?: string;
}

export const UserNav: FC<UserNavProps> = ({className}) => {
  return (
    <nav className={className}>
      <UserNavListStyled>
        {
          UserNavData.map((el) => (
            <li key={el.link}>
                <LinkStyled to={el.link}>{el.text}</LinkStyled>
            </li>))
        }
      </UserNavListStyled>
    </nav>
  );
};