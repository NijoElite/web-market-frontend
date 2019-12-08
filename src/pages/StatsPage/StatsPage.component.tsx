import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ProductApi } from '../../services/Product/ProductApi';
import { Container } from '../../components/Container/Container.component';
import { Headline } from '../../components/Headline/Headline.component';
import { Block } from '../../components/Block/Block.component';
import { Currency } from '../../components/Currency/Currency.component';
import { BlockHeader } from '../../components/BlockHeader/BlockHeader.component';
import styled from '@emotion/styled/macro';

const StatRow = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-between;
`;

interface Statistic {
  totalQty: number;
  totalCost: number;
  paidQty: number;
  paidCost: number;
}

export const StatsPage: FC = () => {
  const [statistic, setStatistic] = useState<Statistic>();
  const { article = '' } = useParams();

  useEffect(() => {
    const fetchStats = async (article: string): Promise<void> => {
      const response = await ProductApi.getStatistic({ article });

      if (response.status === 'success') {
        setStatistic(response.data);
      }
    };

    fetchStats(article);
  }, [article]);

  if (!statistic) {
    return <div>Нет статистики</div>;
  }

  return (
    <Container>
      <Headline>Статистика для {article}</Headline>
      <Block>
        <BlockHeader>Оплачено</BlockHeader>
        <StatRow>
          <span>Количество</span>
          {statistic.paidQty}
        </StatRow>
        <StatRow>
          <span>Стоимость</span>
          <span>
            {statistic.paidCost}
            <Currency type="rub" />
          </span>
        </StatRow>
      </Block>
      <Block>
        <BlockHeader>Всего</BlockHeader>
        <StatRow>
          <span>Количество</span>
          {statistic.totalQty}
        </StatRow>
        <StatRow>
          <span>Стоимость</span>
          <span>
            {statistic.totalCost}
            <Currency type="rub" />
          </span>
        </StatRow>
      </Block>
    </Container>
  );
};
