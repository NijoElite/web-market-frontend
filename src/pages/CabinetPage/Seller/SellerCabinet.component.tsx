import React, { FC, useEffect, useState } from 'react';
import Cabinet from '../Cabinet.component';
import { Headline } from '../../../components/Headline/Headline.component';
import { OrdersTable } from '../../../components/OrdersTable/OrdersTable.component';
import { Order } from '../../../services/Order/types';
import { OrderApi } from '../../../services/Order/OrderApi';

export const SellerCabinet: FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async (): Promise<void> => {
      const response = await OrderApi.getCustomerOrders();

      if (response.status === 'success') {
        setOrders(response.data);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Cabinet>
      <Headline>У Вас заказали</Headline>
      {orders.length === 0 && <span>Заказов нет</span>}
      <OrdersTable orders={orders} isCustomer={true} />
    </Cabinet>
  );
};
export default SellerCabinet;
