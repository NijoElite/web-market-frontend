import styled from '@emotion/styled/macro';
import React, { FC } from 'react';
import { LoginForm } from '../../components/Forms/LoginForm/LoginForm.component';

import { Container } from '../../ui-kit/Container/Container.component';
import { mediaMd } from '../../utils/css.utils';

// #region styled
const LoginPageStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 20px;

  ${mediaMd} {
    margin: 0;
    margin-top: 60px;
  }
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