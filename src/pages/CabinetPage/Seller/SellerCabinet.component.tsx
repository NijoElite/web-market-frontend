import React, { FC } from 'react';
import { Button } from '../../../components/Button/Button.component';
import { ActionsBlockStyled } from '../ActionsBlock.component';
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom';
import { SellerOrders } from './SellerOrders.component';
import { NewProduct } from './NewProduct.component';
import { ProductsList } from './ProductsList.component';
import { SellerStats } from './SellerStats.component';

export const SellerCabinet: FC = () => {
  const match = useRouteMatch();

  return (
    <React.Fragment>
      <ActionsBlockStyled>
        <Link to="/cabinet/seller/add">
          <Button>Добавить товар</Button>
        </Link>
        <Link to="/cabinet/seller">
          <Button>Заказы</Button>
        </Link>
        <Link to="/cabinet/seller/products">
          <Button>Мои товары</Button>
        </Link>
        <Link to="/cabinet/seller/stats">
          <Button>Статистика</Button>
        </Link>
      </ActionsBlockStyled>

      {match && (
        <Switch>
          <Route exact path={`${match.url}/`} component={SellerOrders} />
          <Route exact path={`${match.url}/add`} component={NewProduct} />
          <Route exact path={`${match.url}/products`} component={ProductsList} />
          <Route exact path={`${match.url}/stats`} component={SellerStats} />
        </Switch>
      )}
    </React.Fragment>
  );
};
export default SellerCabinet;
