import React, {memo, FC} from 'react';
import styled from '@emotion/styled/macro';
import { mediaMd, linkReset, transition, linkColor } from '../../../utils/css.utils';
import {navCategoriesData} from '../HeaderData';
import { Icon } from '../../../ui-kit/Icon/Icon.component';
import { Container } from '../../../ui-kit/Container/Container.component';
import { Link } from 'react-router-dom';

// #region styled
const NavStyled = styled.nav`
  display: none;
  flex-direction: row;
  justify-content: space-between;
  padding: 0;
  flex-wrap: wrap;

  ${mediaMd} {
    display: flex;
  }
`;

const CategoryItemStyled = styled(Link)`
  ${linkReset};
  ${transition('all')};
  ${linkColor('#000000')};

  width: ${100 / navCategoriesData.categories.length}%;
  text-align: center;
  font-size: 39px;
  padding: 7px 0 14px 0;

  &:hover {
    background: #ffc608; 
  }
`;

const CategoryItemImageStyled = styled.div`
  position: relative;
  line-height: 60px;
  font-size: 25px;
  width: 100%;
`;

const CategoryItemTextStyled = styled.p`
  font-size: 11px;
  margin: 0;
  position: relative;
  text-transform: uppercase;
`;

const CatNavWrapperStyled = styled.div`
  background: #f1f1f1;
  display: none;

  ${mediaMd} {
    display: block;
  }
`;
// #endregion

const findCatIcon = (catName: string): {catName: string; unicode: string; displayName: string; fontSize?: string} => {
  const cat = navCategoriesData.categories.find((el) => el.catName === catName)
  return cat || navCategoriesData.defaultCategory;
}

interface CategoryItemProps {
  catName: string;
  displayName: string;
  className?: string;
}

const CategoryItem: FC<CategoryItemProps> = memo(({className, catName, displayName}) => {
  const cat = findCatIcon(catName);
  return (
    <CategoryItemStyled to={'/'+catName} className={className}  >
      <CategoryItemImageStyled>
        <Icon unicodeChar={cat.unicode} fontSize={cat.fontSize}/>
      </CategoryItemImageStyled>
      <CategoryItemTextStyled>{displayName}</CategoryItemTextStyled>
    </CategoryItemStyled>
  )  
});

interface CategoriesNavProps {
  className?: string;
}

export const CategoriesNav: FC<CategoriesNavProps> = ({className}) => {
  return (
    <CatNavWrapperStyled className={className}>  
      <Container>
        <NavStyled>
          {navCategoriesData.categories.map((data) => {
            return <CategoryItem catName={data.catName} displayName={data.displayName} key={data.catName}/>
          })}
        </NavStyled>
      </Container>
    </CatNavWrapperStyled>);
}