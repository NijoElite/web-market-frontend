import styled from '@emotion/styled/macro';
import React, { FC, useState } from 'react';
import { LoginForm, LoginFormFields } from '../../components/Forms/LoginForm/LoginForm.component';

import { Container } from '../../ui-kit/Container/Container.component';
import { mediaMd } from '../../utils/css.utils';
import { AuthApi } from '../../services/Auth/AuthApi';
import { RESPONSE_ERROR } from '../../services/types';
import { Modal } from '../../ui-kit/Modal/Modal.component';
import { Button } from '../../ui-kit/Button/Button.component';
import { Redirect } from 'react-router-dom';

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
  const [modalState, setModalState] = useState({ show: false, message: '' });
  const [redirectToMain, setRedirectToMain] = useState(false);

  const handleSubmit = async (values: LoginFormFields): Promise<void> => {
    const response = await AuthApi.getToken(values.email, values.password);
    if (response.status === RESPONSE_ERROR) {
      setModalState({
        show: true,
        message: response.errors[0].message,
      });
    } else {
      setRedirectToMain(true);
    }
  };

  const handleCloseModal = (): void => setModalState({ ...modalState, show: false });

  if (redirectToMain) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <LoginPageStyled>
        <LoginForm onSubmit={handleSubmit} />
        <Modal show={modalState.show} onBackClick={handleCloseModal}>
          <Modal.Title>Ошибка</Modal.Title>
          <Modal.Body>{modalState.message}</Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseModal}>OK</Button>
          </Modal.Footer>
        </Modal>
      </LoginPageStyled>
    </Container>
  );
};
