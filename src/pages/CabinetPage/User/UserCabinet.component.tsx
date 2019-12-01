import React, { FC, useEffect, useState } from 'react';
import { Order } from '../../../services/Order/types';
import { OrderApi } from '../../../services/Order/OrderApi';
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
    <React.Fragment>
      <Headline>История ваших заказов</Headline>
      {orders.length === 0 && <span>Заказов нет</span>}
      <OrdersTable orders={orders} isSeller={false} />
    </React.Fragment>
  );
};

export default UserCabinet;
