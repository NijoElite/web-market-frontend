import React, { FC, useEffect, useState } from 'react';
import CabinetLayout from '../Cabinet.component';
import { Order } from '../../../services/Order/types';
import { OrderApi } from '../../../services/Order/OrderApi';
import { TableRow, Table, TableCell, DropTable as SubTable } from '../../../components/Table/Table.component';
import { Currency } from '../../../components/Currency/Currency.component';
import styled from '@emotion/styled/macro';
import { OrdersTable } from '../../../components/OrdersTable/OrdersTable.component';
import { Headline } from '../../../components/Headline/Headline.component';

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
      <Headline>История ваших заказов</Headline>
      {orders.length === 0 && <span>Заказов нет</span>}
      <OrdersTable orders={orders} isCustomer={false}/>
    </CabinetLayout>
  );
};

export default UserCabinet;
