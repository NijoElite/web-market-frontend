import styled from '@emotion/styled/macro';
import React, { FC } from 'react';
import { LoginForm } from '../../components/Forms/LoginForm/LoginForm.component';

import { Container } from '../../ui-kit/Container/Container.component';

// #region styled
const LoginPageStyled = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
// #endregion

export const LoginPage: FC = () => {
  return (
    <Container>
      <LoginPageStyled>
        <LoginForm onSubmit={(values): void =>{console.log(values)}}/>
      </LoginPageStyled>  
    </Container>
  );
}