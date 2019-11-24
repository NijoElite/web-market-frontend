import React, { FC, useState, useEffect } from 'react';
import { mediaMd, mediaLg } from '../../utils/css.utils';
import styled from '@emotion/styled/macro';
import { GameCard } from '../GameCard/GameCard.component';
import { Product } from '../../services/Product/types';
import { ProductApi } from '../../services/Product/ProductApi';

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

export const Catalog: FC = () => {
  const [fetchError, setFetchError] = useState(false);
  const [games, setGames] = useState<Product[] | null>(null);

  useEffect(() => {
    const fetchLatestGames = async (): Promise<void> => {
      const response = await ProductApi.getLatest();

      if (response.status === 'error') {
        setFetchError(true);
      } else {
        setGames(response.data);
      }
    };
    if (!games) {
      fetchLatestGames();
    }
  });

  if (fetchError) {
    return <div>Произошла ошибка при загрузку данных</div>;
  }

  return (
    <CatalogStyled>
      {games &&
        games.map(game => (
          <ColumnStyled key={game.article}>
            <GameCard game={game} />
          </ColumnStyled>
        ))}
    </CatalogStyled>
  );
};
