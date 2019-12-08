import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ProductApi } from '../../services/Product/ProductApi';
import { Container } from '../../components/Container/Container.component';
import { Headline } from '../../components/Headline/Headline.component';
import { Block } from '../../components/Block/Block.component';
import { Currency } from '../../components/Currency/Currency.component';
import { BlockHeader } from '../../components/BlockHeader/BlockHeader.component';
import styled from '@emotion/styled/macro';
import dayjs from 'dayjs';

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

  const [startDate, setStartDate] = useState(new Date('1970-01-01'));
  const [endDate, setEndDate] = useState(new Date());

  const { article = '' } = useParams();

  useEffect(() => {
    const fetchStats = async (article: string): Promise<void> => {
      const response = await ProductApi.getStatistic({ article, date: { start: startDate, end: endDate } });

      if (response.status === 'success') {
        setStatistic(response.data);
      }
    };

    fetchStats(article);
  }, [article, endDate, startDate]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>, dateType: string): void => {
    const date = dayjs(event.target.value, 'YYYY-MM-DD').toDate();

    if (isNaN(+date)) {
      return;
    }

    if (dateType === 'start') {
      setStartDate(date);
    }
    if (dateType === 'end') {
      setEndDate(date);
    }
  };

  if (!statistic) {
    return <div>Нет статистики</div>;
  }

  return (
    <Container>
      <Headline>Статистика для {article}</Headline>
      <Block>
        <BlockHeader>Период</BlockHeader>
        <div>
          <label htmlFor="startDate">Начальная дата</label>
          <input
            value={dayjs(startDate).format('YYYY-MM-DD')}
            onChange={(event): void => handleDateChange(event, 'start')}
            id="startDate"
            name="startDate"
            type="date"
          />
        </div>
        <div>
          <label htmlFor="endDate">Конечная дата</label>
          <input
            value={dayjs(endDate).format('YYYY-MM-DD')}
            onChange={(event): void => handleDateChange(event, 'end')}
            id="endDate"
            name="endDate"
            type="date"
          />
        </div>
      </Block>
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
