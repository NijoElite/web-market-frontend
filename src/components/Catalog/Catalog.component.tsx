import React, { FC } from 'react';
import {Product} from '../../models/interfaces';
import { mediaMd, mediaLg } from '../../utils/css.utils';
import styled from '@emotion/styled/macro';
import { GameCard } from '../GameCard/GameCard.component';

// #region styled
const CatalogStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ColumnStyled = styled.div`
  width: 50%;
  padding: 10px;

  ${mediaMd} {
    width: 25%;
  }

  ${mediaLg} {
    width: 20%;
  }
`;
// #endregion

interface CatalogProps {
  games: Product[];
  className?: string;
}

export const Catalog: FC<CatalogProps> = ({games, className}) => {
  return (
    <CatalogStyled className={className}>
      {games.map(game => (
        <ColumnStyled key={game.article}>
          <GameCard game={game}/>
        </ColumnStyled>))}
    </CatalogStyled>
  );
}
