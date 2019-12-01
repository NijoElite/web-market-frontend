import React, { FC } from 'react';

import { useFormik } from 'formik';
import { Input } from '../../Form/Input/Input.component';
import { FormHeader } from '../../Form/FormHeader/FormHeader.component';
import { FormButton } from '../../Form/FormButton/FormButton.component';
import styled from '@emotion/styled/macro';

// #region styled
const FormStyled = styled.form`
  background: #fff;
  padding: 25px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
`;
// #endregion

export interface RegFormFields {
  firstName: string;
  secondName: string;
  lastName: string;
  birthday: string;
  email: string;
  password: string;
}

export interface RegFormErrors {
  firstName?: string;
  secondName?: string;
  lastName?: string;
  birthday?: string;
  email?: string;
  password?: string;
}

export interface RegFormProps {
  onSubmit(values: RegFormFields): void;
  className?: string;
}

const validate = (values: RegFormFields): RegFormErrors => {
  const errors: RegFormErrors = {};

  if (!values.email) {
    errors.email = 'Обязательное поле';
  } else if (!/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
    errors.email = 'Неправильный формат';
  }

  if (!values.password) {
    errors.password = 'Обязательное поле';
  } else if (values.password.length < 8) {
    errors.password = 'Минимум 8 символов';
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
  } else if (!/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(values.birthday)) {
    errors.birthday = 'Неправильный формат';
  }

  return errors;
};

export const RegForm: FC<RegFormProps> = ({ className, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      secondName: '',
      lastName: '',
      birthday: '',
      email: '',
      password: '',
    },
    validate,
    onSubmit: onSubmit,
  });

  return (
    <FormStyled onSubmit={formik.handleSubmit} className={className}>
      <FormHeader>Регистрация</FormHeader>
      <Input
        id="lastName"
        name="lastName"
        type="text"
        placeholder="Навальный"
        labelText="Фамилия"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
        isValid={!formik.errors.lastName}
        errorMessage={formik.errors.lastName}
      />

      <Input
        id="firstName"
        name="firstName"
        type="text"
        placeholder="Алексей"
        labelText="Имя"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
        isValid={!formik.errors.firstName}
        errorMessage={formik.errors.firstName}
      />

      <Input
        id="secondName"
        name="secondName"
        type="text"
        placeholder="Анатольевич"
        labelText="Отчество"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.secondName}
        isValid={!formik.errors.secondName}
        errorMessage={formik.errors.secondName}
      />

      <Input
        id="birthday"
        name="birthday"
        type="text"
        placeholder="01-01-1970"
        labelText="Дата рождения (YYYY-MM-DD)"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.birthday}
        isValid={!formik.errors.birthday}
        errorMessage={formik.errors.birthday}
      />

      <Input
        id="email"
        name="email"
        type="email"
        placeholder="email@example.com"
        labelText="Email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        isValid={!formik.errors.email}
        errorMessage={formik.errors.email}
      />

      <Input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Password"
        labelText="Пароль"
        value={formik.values.password}
        isValid={!formik.errors.password}
        errorMessage={formik.errors.password}
      />
      <FormButton>Зарегистрироваться</FormButton>
    </FormStyled>
  );
};
