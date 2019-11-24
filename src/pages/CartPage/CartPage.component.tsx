import React, { FC, useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { Container } from '../../ui-kit/Container/Container.component';
import { mediaMd } from '../../utils/css.utils';
import css from '@emotion/css';
import { Product } from '../../services/Product/types';
import { CartItem } from '../../store/cart/types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { Dispatch } from 'redux';
import { addItemInCart, deleteCartItem } from '../../store/cart/actions';
import { ProductApi } from '../../services/Product/ProductApi';

// #region styled
const Block = styled.div`
  background: #fff;
  padding: 10px;
  margin-bottom: 15px;
`;

const Wrapper = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 15px;
`;

const BlockHeader = styled.h3`
  font-size: 24px;
  font-weight: bold;
`;

const Header = styled.h2`
  font-size: 34px;
  font-weight: bold;
  width: 100%;
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

const CartItemStyled = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f6f6f6;
  position: relative;
`;

const ButtonsGroup = styled.div`
  margin-right: 25px;
  height: 40px;
  display: flex;
  align-items: center;
`;

const actionButton = css`
  width: 25px;
  height: 25px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 100%;
  position: relative;
  cursor: pointer;
  transition: all 0.1s linear;

  &:hover {
    color: #eee;
  }
`;

const line = css`
  content: '';
  width: 10px;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  display: block;
  left: calc(50% - 5px);
  position: absolute;
  top: 50%;
`;

const DeleteButton = styled.div`
  ${actionButton}
  width: 27px;
  height: 27px;

  &:after {
    ${line}
    transform: rotate(-45deg);
  }

  &:before {
    ${line}
    transform: rotate(45deg);
  }
`;

const RemoveButton = styled.div`
  ${actionButton}
  &:after {
    ${line}
  }
`;

const AddButton = styled.div`
  ${actionButton}
  &:before {
    ${line}
    transform: rotate(-90deg);
  }

  &:after {
    ${line}
  }
`;

const Count = styled.div`
  width: 32px;
  text-align: center;
  font-weight: bold;
`;

const Left = styled.div`
  width: 50%;
  display: flex;
`;

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
`;
// #endregion

interface CartItemProps {
  game: Product;
  qty: number;
  onAdd: (article: string) => void;
  onRemove: (article: string) => void;
}

const CartListItem: FC<CartItemProps> = ({ game, qty, onAdd, onRemove }) => {
  return (
    <CartItemStyled>
      <Left>
        <Link to={'/catalog/' + game.article}>{game.name}</Link>
      </Left>
      <Right>
        <ButtonsGroup>
          <RemoveButton onClick={(): void => onRemove(game.article)} />
          <Count>{qty}</Count>
          <AddButton onClick={(): void => onAdd(game.article)} />
        </ButtonsGroup>
      </Right>
    </CartItemStyled>
  );
};

interface StateProps {
  cartItems: CartItem[];
}

interface DispatchProps {
  addInCart: (article: string) => void;
  removeFromCart: (article: string) => void;
}

type Props = StateProps & DispatchProps;

const CartPage: FC<Props> = ({ addInCart, cartItems, removeFromCart }) => {
  const [games, setGames] = useState<Product[] | null>(null);

  useEffect(() => {
    const fetchGames = async (): Promise<void> => {
      const fetchedGames: Product[] = [];

      for (const el of cartItems) {
        const response = await ProductApi.getProduct({ article: el.article });
        if (response.status === 'success') {
          fetchedGames.push(response.data);
        }
      }

      setGames(fetchedGames);
    };

    if (!games) {
      fetchGames();
    }
  });

  const items = !games
    ? []
    : games.map(game => {
        const gameInCart = cartItems.find(el => el.article === game.article);
        const qty = gameInCart ? gameInCart.qty : 0;
        if (qty === 0) {
          return null;
        }
        return <CartListItem key={game.article} game={game} onAdd={addInCart} onRemove={removeFromCart} qty={qty} />;
      });

  return (
    <Container>
      <Wrapper>
        <Header>Корзина</Header>
        <LeftSidebar>{items}</LeftSidebar>
        <RightSidebar></RightSidebar>
      </Wrapper>
    </Container>
  );
};

const mapStateToProps = (root: AppState): StateProps => {
  return {
    cartItems: root.cart.items,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    addInCart: (article: string): void => {
      dispatch(addItemInCart(article));
    },
    removeFromCart: (article: string): void => {
      dispatch(deleteCartItem(article));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
