import React, { FC } from 'react';
import {Product} from '../../models/interfaces';
import { linkColor } from '../../utils/css.utils';
import styled from '@emotion/styled/macro';
import { Currency } from '../../ui-kit/Currency/Currency.component';
import { Link } from 'react-router-dom';

// #region styled
const ImageStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Hover = styled.div`
  background: #000;
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.15s linear;
`;

const NameStyled = styled.p`
  color: #ffffff;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); 
  margin: 0;
  transition: all 0.15s linear;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const PriceStyled = styled(Currency)`
  position: absolute;
  bottom: 30px;
  background: #fff;
  color: #000000;
  border-radius: 20px;
  padding: 10px 30px;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.15s linear;
`;

const GameCardStyled = styled(Link)`
  ${linkColor('#000')}
  position: relative;
  cursor: pointer;
  display: block;
  overflow: hidden;

  &:hover {
    ${Hover} {
      opacity: 0.7;
    }
    ${NameStyled} {
      opacity: 1.0;
    }
    ${PriceStyled} {
      background: #ffc608;
    }
  }
`;
// #endregion

interface GameCardProps {
  game: Product;
  className?: string;
}

export const GameCard: FC<GameCardProps> = ({game, className}) => {
  return (
    <GameCardStyled to={'/catalog/' + game.article} className={className}>
      <ImageStyled src={'' + game.defaultImage} alt=''/>
      <Hover/>
      <NameStyled>{game.name}</NameStyled>
      <PriceStyled type='rub'>{game.price}</PriceStyled>
    </GameCardStyled>
  );
}
