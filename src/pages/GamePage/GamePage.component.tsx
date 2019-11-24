import styled from '@emotion/styled/macro';
import React, { FC, useEffect, useState } from 'react';
import { Container } from '../../ui-kit/Container/Container.component';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { login } from '../../store/system/actions';
import { AppState } from '../../store';
import { Product } from '../../types/types';
import { useParams } from 'react-router';
import { mediaMd } from '../../utils/css.utils';
import { Button } from '../../ui-kit/Button/Button.component';
import { string } from 'prop-types';
import { ProductApi } from '../../services/Product/ProductApi';
import { GetProductResponse } from '../../services/Product/types';
import { ErrorResponse } from '../../services/types';

// #region styled
const Header = styled.h2`
  font-size: 34px;
  font-weight: bold;
  width: 100%;
`;

const Wrapper = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 15px;
`;

const LeftSidebar = styled.div`
  width: 100%;
  background: #fff;
  margin-bottom: 15px;

  ${mediaMd} {
    margin-bottom: 0;

    width: 29%;
  }
`;

const RightSidebar = styled.div`
  width: 100%;

  ${mediaMd} {
    width: 70%;
  }
`;

const GameLogo = styled.div`
  width: 100%;

  > img {
    width: 100%;
    height: auto;
  }
`;

const BlockHeader = styled.h3`
  font-size: 24px;
  font-weight: bold;
`;

const GenresList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 15px;
`;

const ReqItem = styled.div`
  font-size: 16px;
  margin: 10px 0;
  display: flex;
`;
const ReqOption = styled.div`
  width: 40%;
`;
const ReqValue = styled.div`
  width: 60%;
`;

const Genre = styled.p``;
const Description = styled.p`
  font-size: 16px;
  font-weight: normal;
`;

const Block = styled.div`
  background: #fff;
  padding: 10px;
  margin-bottom: 15px;
`;

const BuyButton = styled(Button)`
  font-weight: bold;
  font-size: 18px;
`;
// #endregion

// #region props

// #endregion

const GamePage: FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [fetchError, setFetchError] = useState(false);

  const { article = '' } = useParams();

  // Load Data
  useEffect(() => {
    const fetchProduct = async (article: string): Promise<void> => {
      const product = await ProductApi.getProduct({ article });
      console.log(product);
      if (product.status === 'success') {
        setProduct(product.data);
      } else {
        setFetchError(true);
      }
    };

    fetchProduct(article);
  }, [article]);

  if (fetchError) {
    return <Header>Произошла ошибка</Header>;
  }

  if (!product) {
    return <Header>Загрузка</Header>;
  }

  return (
    <Container>
      <Wrapper>
        <Header>Купить {article}</Header>

        <LeftSidebar>
          <GameLogo>
            <img src={'/' + product.defaultImage} alt="" />
          </GameLogo>
          <GenresList>
            {product.genres.map(el => (
              <Genre>{el}</Genre>
            ))}
          </GenresList>
        </LeftSidebar>
        <RightSidebar>
          <Block>
            <BlockHeader>Описание</BlockHeader>
            <Description>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione facere et, quidem ut reiciendis error ea
              labore numquam ipsum sit.
            </Description>
            <BuyButton>В корзину</BuyButton>
          </Block>
          {product.requirements && (
            <Block>
              <BlockHeader>Системные требования</BlockHeader>
              {product.requirements.map(req => {
                return (
                  <ReqItem>
                    <ReqOption>{req.option}</ReqOption>
                    <ReqValue>{req.value}</ReqValue>
                  </ReqItem>
                );
              })}
            </Block>
          )}
        </RightSidebar>
      </Wrapper>
    </Container>
  );
};

export default GamePage;
