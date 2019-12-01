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

  const onOrderStatusChange = async (order: string, article: string, status: boolean): Promise<void> => {
    const response = await OrderApi.changeStatus(order, article, status);

    if (response.status === 'success') {
      const newOrder = response.data;
      const updatedOrders = orders.map(order => (order._id === newOrder._id ? newOrder : order));

      setOrders(updatedOrders);
    }
  };

  return (
    <Cabinet>
      <Headline>У Вас заказали</Headline>
      {orders.length === 0 && <span>Заказов нет</span>}
      <OrdersTable orders={orders} isCustomer={true} onChangeStatusClick={onOrderStatusChange} />
    </Cabinet>
  );
};
export default SellerCabinet;
