import React, { FC, useEffect, useState } from 'react';
import { Order } from '../../../services/Order/types';
import { OrderApi } from '../../../services/Order/OrderApi';
import { OrdersTable } from '../../../components/OrdersTable/OrdersTable.component';
import { Headline } from '../../../components/Headline/Headline.component';
import { UserApi } from '../../../services/User/UserApi';
import { User } from '../../../services/User/types';
import { AppState } from '../../../store';
import { connect } from 'react-redux';
import { Block } from '../../../components/Block/Block.component';
import styled from '@emotion/styled';
import { Input } from '../../../components/Form/Input/Input.component';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { Button } from '../../../components/Button/Button.component';

// #region styled
const UserInfoInput = styled(Input)``;
const UserFormStyled = styled('form')`
  max-width 300px;
  padding: 25px;
`;

// #endregion

interface UserCabinetProps {
  userId?: string;
}

interface UserBlockProps {
  user: User;
  onSubmit: (fields: UpdateFormFields) => void;
}

interface UpdateFormFields {
  email: string;
  firstName: string;
  secondName: string;
  lastName: string;
  phone: string;
  birthday: string;
}

type UpdateFormErrors = Partial<UpdateFormFields>;

const validate = (values: UpdateFormFields): UpdateFormErrors => {
  const errors: UpdateFormErrors = {};

  if (!values.email) {
    errors.email = 'Обязательное поле';
  } else if (!/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
    errors.email = 'Неправильный формат';
  }

  if (!values.firstName) {
    errors.firstName = 'Обязательное поле';
  }

  if (!values.secondName) {
    errors.secondName = 'Обязательное поле';
  }

  if (!values.lastName) {
    errors.lastName = 'Обязательное поле';
  }

  if (!values.birthday) {
    errors.birthday = 'Обязательное поле';
  } else if (!/^([0-2][0-9]|(3)[0-1])(\.)(((0)[0-9])|((1)[0-2]))(\.)\d{4}$/.test(values.birthday)) {
    errors.birthday = 'Неправильный формат';
  }

  if (values.phone) {
    if (!/^[+]{1}[0-9]{11}$/.test(values.phone)) {
      errors.phone = 'Неправильный формат';
    }
  }

  return errors;
};

const UserBlock: FC<UserBlockProps> = ({ user, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      email: user.email || '',
      firstName: user.firstName,
      secondName: user.secondName,
      lastName: user.lastName,
      phone: user.phone,
      birthday: dayjs(user.birthday).format('DD.MM.YYYY'),
    },
    validate,
    onSubmit: onSubmit,
  });

  return (
    <Block>
      <UserFormStyled onSubmit={formik.handleSubmit}>
        <UserInfoInput
          id="lastName"
          name="lastName"
          type="text"
          labelText="Фамилия"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
          isValid={!formik.errors.lastName}
          errorMessage={formik.errors.lastName}
        />
        <UserInfoInput
          id="firstName"
          name="firstName"
          type="text"
          labelText="Имя"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
          isValid={!formik.errors.firstName}
          errorMessage={formik.errors.firstName}
        />
        <UserInfoInput
          id="secondName"
          name="secondName"
          type="text"
          labelText="Отчество"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.secondName}
          isValid={!formik.errors.secondName}
          errorMessage={formik.errors.secondName}
        />
        <UserInfoInput
          id="birthday"
          name="birthday"
          type="text"
          labelText="Дата рождения (ДД.ММ.ГГГГ)"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.birthday}
          isValid={!formik.errors.birthday}
          errorMessage={formik.errors.birthday}
        />
        <UserInfoInput
          id="phone"
          name="phone"
          type="text"
          labelText="Телефон (начиная с +, 11 цифр)"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          isValid={!formik.errors.phone}
          errorMessage={formik.errors.phone}
        />
        <UserInfoInput
          id="email"
          name="email"
          type="text"
          labelText="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          isValid={!formik.errors.email}
          errorMessage={formik.errors.email}
        />
        <Button type="submit">Подтвердить</Button>
      </UserFormStyled>
    </Block>
  );
};

const UserCabinet: FC<UserCabinetProps> = ({ userId }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User>();

  const fetchOrders = async (): Promise<void> => {
    const response = await OrderApi.getUserOrders();

    if (response.status === 'success') {
      setOrders(response.data);
    }
  };

  const fetchUserInfo = async (userId: string): Promise<void> => {
    const response = await UserApi.getUser(userId);

    if (response.status === 'success') {
      setUser(response.data.user);
    }
  };

  const handleFormSubmit = async (fields: UpdateFormFields): Promise<void> => {
    const response = await UserApi.updateUser({ id: userId || '', ...fields });

    if (response.status === 'success') {
      setUser(response.data.user);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchUserInfo(userId || '');
  }, [userId]);

  return (
    <React.Fragment>
      <Headline>Ваш аккаунт</Headline>
      {user && <UserBlock user={user} onSubmit={handleFormSubmit} />}
      <Headline>История ваших заказов</Headline>
      {orders.length === 0 && <span>Заказов нет</span>}
      <OrdersTable orders={orders} isSeller={false} />
    </React.Fragment>
  );
};

// #region Map to Props
const mapStateToProps = (root: AppState): UserCabinetProps => {
  return {
    userId: root.system.userId,
  };
};
// #endregion

export default connect(mapStateToProps)(UserCabinet);
