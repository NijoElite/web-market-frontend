import React, { FC } from 'react';

import { useFormik } from 'formik';
import { Input } from '../../../ui-kit/Form/Input/Input.component';
import { FormHeader } from '../../../ui-kit/Form/FormHeader/FormHeader.component';
import { FormButton } from '../../../ui-kit/Form/FormButton/FormButton.component';
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

interface LoginFormFields {
  email: string;
  password: string; 
}

interface LoginFormErrors {
  email?: string;
  password?: string; 
}

interface LoginFormProps {
  onSubmit(values: LoginFormFields): void; 
  className?: string;
}

const validate = (values: LoginFormFields): LoginFormErrors => {
  const errors: LoginFormErrors = {};

  if (!values.email) {
    errors.email = 'Обязательное поле';
  } else if (!/^\S+@\S+$/.test(values.email)) {
    errors.email = 'Неправильный формат';
  }

  if (!values.password) {
    errors.password = 'Обязательное поле';
  }

  return errors;
}

export const LoginForm: FC<LoginFormProps> = ({className, onSubmit}) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: onSubmit,
  });

  return (
    <FormStyled onSubmit={formik.handleSubmit} className={className}>
      <FormHeader>Войти</FormHeader>
      <Input
        id="email"
        name="email"
        type="text"
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
      <FormButton>Войти</FormButton>
    </FormStyled>
  );
}
