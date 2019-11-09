import React, {memo, FC} from 'react';
import styled from '@emotion/styled/macro';
import {Container} from '../../ui-kit/Container/Container.component';
import {linkReset, mediaMd} from '../../utils/css.utils';
import { MobileHeader } from './MobileHeader/MobileHeader.component';
import { CategoriesNav } from './CategoriesNav/CategoriesNav.component';
import { SearchForm } from './SearchForm/SearchForm.component';
import { UserNav } from './UserNav/UserNav.component';
import { SiteNav } from './SiteNav/SiteNav.component';
import { Link } from 'react-router-dom';

// #region styled
const HeaderStyled = styled.header`
  background: #ffffff;
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
  
  ${mediaMd} {
    padding-top: 15px;
    position: relative;

  }
`;

const TopHeader = styled.div`
  display: flex;
  height: 65px;

  ${mediaMd} {
    height: 130px;
  }
`;

const LogoStyled = styled(Link)`
  ${linkReset}
  height: 100%; 
  padding: 5px 15px;
  max-height: 130px;

  & img {
    max-height: 100%;
  }
`;

const TopColumnStyled = styled.div`
  width: 100%;
  padding: 0 15px;
  display: flex;
  justify-content: stretch;
  align-items: center;

  ${mediaMd} {
    display: block;
  }
`;
// #endregion

const Logo: FC = () => {
  return (
    <LogoStyled to='/'>
      <img src='/img/logo.png' alt=''/>
    </LogoStyled>
  );
}

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = memo(({className}) => {
  return (
    <HeaderStyled className={className}>
      <Container> 
        <TopHeader>
          <MobileHeader/>
          <Logo/>
          <TopColumnStyled>
            <UserNav/>
            <SearchForm/>
          </TopColumnStyled>
        </TopHeader>
      </Container>
      <SiteNav/>
      <CategoriesNav/>
    </HeaderStyled>
  );
});