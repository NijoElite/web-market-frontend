import styled from '@emotion/styled/macro';
import React, { FC, useState } from 'react';
import { RegForm, RegFormFields } from '../../components/Forms/RegForm/RegForm.component';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Container } from '../../components/Container/Container.component';
import { mediaMd } from '../../utils/css.utils';
import { Modal } from '../../components/Modal/Modal.component';
import { Redirect } from 'react-router-dom';
import { Button } from '../../components/Button/Button.component';
import { UserApi } from '../../services/User/UserApi';

dayjs.extend(customParseFormat);

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
  const [modalState, setModalState] = useState({ show: false, message: '' });
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleClose = (): void => setModalState({ ...modalState, show: false });

  const handleSubmit = async (values: RegFormFields): Promise<void> => {
    try {
      const response = await UserApi.createUser({
        ...values,
        birthday: dayjs(values.birthday, 'DD.MM.YYYY').toISOString(),
      });

      if (response.status === 'error') {
        setModalState({
          show: true,
          message: response.errors.map(err => err.name + ' ' + err.message).join('\n'),
        });
      } else {
        setRedirectToLogin(true);
      }
    } catch (err) {
      setModalState({
        show: true,
        message: 'Произошла ошибка при выполнении запроса, повторите попытку :(',
      });
    }
  };

  if (redirectToLogin) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      <RegPageStyled>
        <RegForm onSubmit={handleSubmit} />
        <Modal show={modalState.show} onBackClick={handleClose}>
          <Modal.Title>Ошибка</Modal.Title>
          <Modal.Body>{modalState.message}</Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>OK</Button>
          </Modal.Footer>
        </Modal>
      </RegPageStyled>
    </Container>
  );
};
