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
  isCustomer: boolean;
  onChangeStatusClick?: (order: string, article: string, status: boolean) => void;
}

interface OrderItemRowProps {
  item: OrderItem;
  isCustomer: boolean;
  onChangeStatusClick?: (article: string, status: boolean) => void;
}

const OrderItemRow: FC<OrderItemRowProps> = ({ item, isCustomer, onChangeStatusClick }) => {
  return (
    <TableRow>
      <TableCell description="Артикул">{item.article}</TableCell>
      {!isCustomer && <TableCell description="Продавец">{item.seller}</TableCell>}
      <TableCell description="Цена">
        {item.price}
        <Currency type="rub" />
      </TableCell>
      <TableCell description="Кол-во">{item.qty}</TableCell>
      <TableCell description="Оплачен">{item.isPaid ? 'Да' : 'Нет'}</TableCell>
      {isCustomer && (
        <TableCell>
          <Button onClick={(): void => onChangeStatusClick && onChangeStatusClick(item.article, !item.isPaid)}>
            Изменить статус
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
};

const OrderCells: FC<{ order: Order; isCustomer: boolean }> = ({ order, isCustomer }) => {
  return (
    <React.Fragment>
      <TableCellBold description="Дата заказа">{new Date(order.createdAt).toLocaleDateString()}</TableCellBold>
      <TableCellBold description="Кол-во">{order.items.length}</TableCellBold>
      {isCustomer && <TableCellBold description="Покупатель">{order.customer}</TableCellBold>}
      <TableCellBold description="Итог">
        {order.items.reduce((totalCost, item) => totalCost + item.qty * item.price, 0)}
        <Currency type="rub" />
      </TableCellBold>
    </React.Fragment>
  );
};

export const OrdersTable: FC<OrdersTableProps> = ({ orders, isCustomer, onChangeStatusClick }) => {
  return (
    <Table>
      {orders.map(order => {
        return (
          <TableRow>
            <OrderCells order={order} isCustomer={isCustomer} />
            <SubTable>
              {order.items.map(item => (
                <OrderItemRow
                  item={item}
                  isCustomer={isCustomer}
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
