import React, { FC, useEffect, useState } from 'react';
import CabinetLayout from '../Cabinet.component';
import { Order } from '../../../services/Order/types';
import { OrderApi } from '../../../services/Order/OrderApi';
import { TableRow, Table, TableCell, DropTable as SubTable } from '../../../components/Table/Table.component';
import { Currency } from '../../../components/Currency/Currency.component';
import styled from '@emotion/styled/macro';

// #region styled
const TableCellBold = styled(TableCell)`
  font-weight: bold;

  &:after {
    font-weight: normal;
  }
`;

const Header = styled.h2`
  font-size: 34px;
  font-weight: bold;
  width: 100%;
`;
// #endregion

const UserCabinet: FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async (): Promise<void> => {
      const response = await OrderApi.getUserOrders();

      if (response.status === 'success') {
        setOrders(response.data);
      }
    };

    fetchOrders();
  }, []);

  return (
    <CabinetLayout>
      <Header>Ваши заказы</Header>

      {orders.length === 0 && <span>Заказов нет</span>}
      {
        <Table>
          {orders.map(order => {
            return (
              <TableRow>
                <TableCellBold description="Дата заказа">
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCellBold>
                <TableCellBold description="Кол-во">{order.items.length}</TableCellBold>
                <TableCellBold description="Итог">
                  {order.items.reduce((totalCost, item) => totalCost + item.qty * item.price, 0)}
                  <Currency type="rub" />
                </TableCellBold>

                <SubTable>
                  {order.items.map(item => {
                    return (
                      <TableRow>
                        <TableCell description="Артикул">{item.article}</TableCell>
                        <TableCell description="Продавец">{item.seller}</TableCell>
                        <TableCell description="Цена">
                          {item.price}
                          <Currency type="rub" />
                        </TableCell>
                        <TableCell description="Кол-во">{item.qty}</TableCell>
                        <TableCell description="Оплачен">{item.isPaid ? 'Да' : 'Нет'}</TableCell>
                      </TableRow>
                    );
                  })}
                </SubTable>
              </TableRow>
            );
          })}
        </Table>
      }
    </CabinetLayout>
  );
};

export default UserCabinet;
