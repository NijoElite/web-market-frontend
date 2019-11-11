import styled from '@emotion/styled/macro';
import React, { FC, useState } from 'react';
import { RegForm, RegFormFields } from '../../components/Forms/RegForm/RegForm.component';

import { Container } from '../../ui-kit/Container/Container.component';
import { mediaMd } from '../../utils/css.utils';
import { Modal } from '../../ui-kit/Modal/Modal.component';
import { Redirect } from 'react-router';
import { Button } from '../../ui-kit/Button/Button.component';

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
  const [modalState, setModalState] = useState({show: false, message: ''});
  const [redirect, setRedirect] = useState(false);

  const handleClose = (): void => setModalState({...modalState, show: false}); 

  const handleSubmit = async (values: RegFormFields): Promise<void> => {
    try {
      const response = await fetch('/api/v1/user', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(values),
      });

      const json = await response.json();

      if (json.status === 'error') {
        setModalState({
          show: true,
          message: json.errors.map((err: { name: string; message: string }) => err.name + ' ' + err.message).join('\n') as string
        });
      } else {
        setRedirect(true);
      }
    } catch (err) {
    }
  }

  return (
    <Container>
      <RegPageStyled>
        <RegForm onSubmit={handleSubmit}/>
        <Modal show={modalState.show} onBackClick={handleClose}>
          <Modal.Title>
            Ошибка
          </Modal.Title>
          <Modal.Body>
            {modalState.message}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>OK</Button>
          </Modal.Footer>
        </Modal>
        {redirect && <Redirect to='/login'/>}
      </RegPageStyled>
    </Container>
  );
}