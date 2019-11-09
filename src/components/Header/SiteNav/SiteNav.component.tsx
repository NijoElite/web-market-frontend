import React, { FC } from "react";
import styled from "@emotion/styled/macro";
import { mediaMd, linkColor, transition } from "../../../utils/css.utils";
import { SiteNavData } from "../HeaderData";
import { Container } from "../../../ui-kit/Container/Container.component";
import { Link } from 'react-router-dom';

// #region styled
const NavStyled = styled.nav`
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  display: none;

  ${mediaMd} {
    display: block;
  }
`;

const ListStyled = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;

const ListItemStyled = styled.li`
  width: 100%;
`;

const LinkStyled = styled(Link)`
  ${linkColor('#000')}
  ${transition('all')}
  text-decoration: none;
  padding: 15px;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  &:hover {
    background: #f1f1f1;
  }
`;

// #endregion

interface SiteNavProps {
  className?: string;
}

export const SiteNav: FC<SiteNavProps> = ({className}) => {
  const items = SiteNavData.map((el) => (
    <ListItemStyled key={el.link}>
     <LinkStyled to={el.link}>{el.text}</LinkStyled>
    </ListItemStyled>)
    );

  return (
    <NavStyled className={className}>
      <Container>
        <ListStyled>
          {items}
        </ListStyled>
      </Container>
    </NavStyled>
  );
};