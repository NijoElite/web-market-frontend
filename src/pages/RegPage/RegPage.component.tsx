import styled from '@emotion/styled/macro';
import React, { FC } from 'react';
import { RegForm } from '../../components/Forms/RegForm/RegForm.component';

import { Container } from '../../ui-kit/Container/Container.component';
import { mediaMd } from '../../utils/css.utils';

// #region styled
const RegPageStyled = styled.div`
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

export const RegPage: FC = () => {
  return (
    <Container>
      <RegPageStyled>
        <RegForm onSubmit={(values): void =>{console.log(values)}}/>
      </RegPageStyled>
    </Container>
  );
}