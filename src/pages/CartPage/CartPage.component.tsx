import React, { FC, useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { Container } from '../../components/Container/Container.component';
import { mediaMd } from '../../utils/css.utils';
import css from '@emotion/css';
import { Product } from '../../services/Product/types';
import { CartItem } from '../../store/cart/types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { Dispatch } from 'redux';
import { addItemInCart, deleteCartItem, updateCartItemQty, clearCart } from '../../store/cart/actions';
import { ProductApi } from '../../services/Product/ProductApi';
import { Currency } from '../../components/Currency/Currency.component';
import { Button } from '../../components/Button/Button.component';
import { OrderApi } from '../../services/Order/OrderApi';
import { setErrors } from '../../store/errors/actions';
import { Error } from '../../services/types';

// #region styled
const Block = styled.div`
  background: #fff;
  padding: 10px;
  margin-bottom: 15px;
  min-height: 350px;
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
  margin-bottom: 15px;

  ${mediaMd} {
    margin-bottom: 0;

    width: 69%;
  }
`;

const RightSidebar = styled.div`
  width: 100%;

  ${mediaMd} {
    width: 29%;
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

const Cost = styled.div``;

const Right = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50%;
`;

const GameImageWrapper = styled.div`
  width: 25%;
  margin-right: 25px;

  > img {
    width: 100%;
  }
`;

const OrderBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: 300px;
`;

// #endregion

interface CartItemProps {
  game: Product;
  qty: number;
  onAdd: (article: string) => void;
  onRemove: (article: string) => void;
  onUpdateQty: (article: string, qty: number) => void;
}

const CartListItem: FC<CartItemProps> = ({ game, qty, onAdd, onRemove, onUpdateQty }) => {
  return (
    <CartItemStyled>
      <Left>
        <GameImageWrapper>
          <img src={'/' + game.defaultImage} alt="" />
        </GameImageWrapper>
        <Link to={'/catalog/' + game.article}>{game.name}</Link>
      </Left>
      <Right>
        <ButtonsGroup>
          <RemoveButton onClick={(): void => onRemove(game.article)} />
          <Count>{qty}</Count>
          <AddButton onClick={(): void => onAdd(game.article)} />
        </ButtonsGroup>
        <Cost>
          {qty * game.price}
          <Currency type="rub" />
        </Cost>
        <DeleteButton onClick={(): void => onUpdateQty(game.article, 0)} />
      </Right>
    </CartItemStyled>
  );
};

// #region Cart Page Interfaces
interface StateProps {
  cartItems: CartItem[];
}

interface DispatchProps {
  addInCart: (article: string) => void;
  removeFromCart: (article: string) => void;
  updateCartItemQty: (article: string, qty: number) => void;
  setError: (errors: Error[]) => void;
  clearCart: () => void;
}

type Props = StateProps & DispatchProps;
// #endregion

const CartPage: FC<Props> = ({ addInCart, cartItems, removeFromCart, updateCartItemQty, setError, clearCart }) => {
  const [games, setGames] = useState<Product[]>([]);

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

    fetchGames();
  }, [cartItems]);

  const makeOrder = async (): Promise<void> => {
    if (cartItems.length === 0) return;

    const response = await OrderApi.createOrder(cartItems);
    if (response.status === 'error') {
      setError(response.errors);
    } else {
      clearCart();
    }
  };

  let totalCost = 0;
  const items = games.map(game => {
    const gameInCart = cartItems.find(el => el.article === game.article);
    const qty = gameInCart ? gameInCart.qty : 0;
    if (qty === 0) {
      return null;
    }
    totalCost += qty * game.price;

    return (
      <CartListItem
        key={game.article}
        game={game}
        onAdd={addInCart}
        onRemove={removeFromCart}
        onUpdateQty={updateCartItemQty}
        qty={qty}
      />
    );
  });

  return (
    <Container>
      <Wrapper>
        <Header>Корзина</Header>
        <LeftSidebar>
          <Block>{items.length !== 0 ? items : 'В корзине ничего нет'}</Block>
        </LeftSidebar>
        <RightSidebar>
          <Block>
            <OrderBlock>
              <BlockHeader>
                {'Итоговая стоимость: ' + totalCost}
                <Currency type="rub" />
              </BlockHeader>
              <Button onClick={makeOrder}>Оформить заказ</Button>
            </OrderBlock>
          </Block>
        </RightSidebar>
      </Wrapper>
    </Container>
  );
};

// #region Map To Props
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
    updateCartItemQty: (article: string, qty: number): void => {
      dispatch(updateCartItemQty(article, qty));
    },
    setError: (errors: Error[]): void => {
      dispatch(setErrors(errors));
    },
    clearCart: (): void => {
      dispatch(clearCart());
    },
  };
};
// #endregion

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
