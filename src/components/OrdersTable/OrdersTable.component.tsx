import React, { FC } from 'react';
import { DropTable as SubTable, Table, TableCell, TableRow } from '../Table/Table.component';
import { Currency } from '../Currency/Currency.component';
import { Order, OrderItem } from '../../services/Order/types';
import styled from '@emotion/styled/macro';
import { Button } from '../Button/Button.component';

// #region styled
const TableCellBold = styled(TableCell)`
  font-weight: bold;

  &:after {
    font-weight: normal;
  }
`;
// #endregion

export interface OrdersTableProps {
  orders: Order[];
  isSeller: boolean;
  onChangeStatusClick?: (order: string, article: string, status: boolean) => void;
}

interface OrderItemRowProps {
  item: OrderItem;
  isSeller: boolean;
  onChangeStatusClick?: (article: string, status: boolean) => void;
}

const OrderItemRow: FC<OrderItemRowProps> = ({ item, isSeller, onChangeStatusClick }) => {
  return (
    <TableRow>
      <TableCell description="Артикул">{item.article}</TableCell>
      {!isSeller && <TableCell description="Продавец">{item.seller}</TableCell>}
      <TableCell description="Цена">
        {item.price}
        <Currency type="rub" />
      </TableCell>
      <TableCell description="Кол-во">{item.qty}</TableCell>
      <TableCell description="Оплачен">{item.isPaid ? 'Да' : 'Нет'}</TableCell>
      {isSeller && (
        <TableCell>
          <Button onClick={(): void => onChangeStatusClick && onChangeStatusClick(item.article, !item.isPaid)}>
            Изменить статус
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
};

const OrderCells: FC<{ order: Order; isSeller: boolean }> = ({ order, isSeller }) => {
  return (
    <React.Fragment>
      <TableCellBold description="Дата заказа">{new Date(order.createdAt).toLocaleDateString()}</TableCellBold>
      <TableCellBold description="Кол-во">{order.items.length}</TableCellBold>
      {isSeller && <TableCellBold description="Покупатель">{order.customer}</TableCellBold>}
      <TableCellBold description="Итог">
        {order.items.reduce((totalCost, item) => totalCost + item.qty * item.price, 0)}
        <Currency type="rub" />
      </TableCellBold>
    </React.Fragment>
  );
};

export const OrdersTable: FC<OrdersTableProps> = ({ orders, isSeller, onChangeStatusClick }) => {
  return (
    <Table>
      {orders.map(order => {
        return (
          <TableRow>
            <OrderCells order={order} isSeller={isSeller} />
            <SubTable>
              {order.items.map(item => (
                <OrderItemRow
                  item={item}
                  isSeller={isSeller}
                  onChangeStatusClick={(article, status): void =>
                    onChangeStatusClick && onChangeStatusClick(order._id, article, status)
                  }
                />
              ))}
            </SubTable>
          </TableRow>
        );
      })}
    </Table>
  );
};
