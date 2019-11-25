import React, { FC, useEffect, useState } from 'react';
import CabinetLayout from '../CabinetLayot.component';
import { Order } from '../../../services/Order/types';
import { OrderApi } from '../../../services/Order/OrderApi';

const UserCabinet: FC = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    const fetchOrders = async (): Promise<void> => {
      const response = await OrderApi.getUserOrders();

      if (response.status === 'success') {
        setOrders(response.data);
      }
    };

    if (!orders) {
      fetchOrders();
    }
  });

  return (
    <CabinetLayout>
      {orders &&
        orders.map(order => {
          return (
            <div>
              <br></br>
              <div>{order.createdAt}</div>
              {order.items.map(item => (
                <div>{item.article + ' ' + item.qty} </div>
              ))}
            </div>
          );
        })}
    </CabinetLayout>
  );
};

export default UserCabinet;
