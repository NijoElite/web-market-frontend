import React, { FC } from 'react';
import styled from '@emotion/styled/macro';

// #region styled
const CurrencyStyled = styled('span')<{symbol: string}>`
  &:after {
    content: '${({symbol}): string => symbol}';
    display: inline;
  }
`;
// #endregion

interface CurrencyProps {
  type: 'rub' | 'usd';
  className?: string;
  chidlren?: React.ReactNode;
}

interface CurrencyMap {
  [index: string]: string;
}

const currencyMap: CurrencyMap = {
  'rub': '₽',
}

export const Currency: FC<CurrencyProps> = ({type, className, children}) => {
  return (
    <CurrencyStyled symbol={currencyMap[type]} className={className}>
      {children}
    </CurrencyStyled>);
}