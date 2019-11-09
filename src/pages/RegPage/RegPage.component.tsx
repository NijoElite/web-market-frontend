import styled from '@emotion/styled/macro';
import React, { FC } from 'react';
import { RegForm } from '../../components/Forms/RegForm/RegForm.component';

import { Container } from '../../ui-kit/Container/Container.component';

// #region styled
const RegPageStyled = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
// #endregion

export const RegPage: FC = () => {
  return (
    <Container>
      <RegPageStyled>
        <RegForm onSubmit={(values): void =>{console.log(values)}}/>
      </RegPageStyled>
    </Container>
  );
}