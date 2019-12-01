import styled from '@emotion/styled/macro';
import { Button } from '../../Button/Button.component';
import React, { FC } from 'react';

// #region styled
const FormButtonStyled = styled(Button)`
  width: 60%;
`;

const FormButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
// #endregion

interface FormButtonProps {
  children?: React.ReactNode;
}

export const FormButton: FC<FormButtonProps> = ({ children }) => {
  return (
    <FormButtonWrapper>
      <FormButtonStyled>{children}</FormButtonStyled>
    </FormButtonWrapper>
  );
};
