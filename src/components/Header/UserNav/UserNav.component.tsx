import React, { FC } from 'react';
import styled from '@emotion/styled/macro';
import { mediaMd, linkColor } from '../../../utils/css.utils';
import {
  UserNavData,
  IS_AUTHENTICATED,
  ANY_AUTH_STATUS,
  NavData,
  NOT_AUTHENTICATED,
  createAuthPredicate,
} from '../HeaderData';
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
  isAuthenticated: boolean;
}

export const UserNav: FC<UserNavProps> = ({ className, isAuthenticated }) => {
  const filterPredicate = createAuthPredicate(isAuthenticated);

  return (
    <nav className={className}>
      <UserNavListStyled>
        {UserNavData.filter(filterPredicate).map(el => (
          <li key={el.link}>
            <LinkStyled to={el.link}>{el.text}</LinkStyled>
          </li>
        ))}
      </UserNavListStyled>
    </nav>
  );
};
