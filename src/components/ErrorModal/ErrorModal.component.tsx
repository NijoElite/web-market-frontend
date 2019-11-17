import React, { FC } from 'react';
import { Modal } from '../../ui-kit/Modal/Modal.component';
import { Button } from '../../ui-kit/Button/Button.component';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { Dispatch } from 'redux';
import { resetErrors } from '../../store/errors/actions';

// #region props
interface DispatchProps {
  resetErrors: () => void;
}

interface StateProps {
  errors?: Error[];
}

type Props = DispatchProps & StateProps;
// #endregion

const ErrorModal: FC<Props> = ({ errors, resetErrors }) => {
  const handleCloseModal = (): void => {
    resetErrors();
  };

  return (
    <Modal show={!!errors} onBackClick={handleCloseModal}>
      <Modal.Title>Ошибка</Modal.Title>
      <Modal.Body>{errors && errors.map(e => e.name + ' ' + e.message)}</Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCloseModal}>OK</Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state: AppState): StateProps => {
  return {
    errors: state.errors.errors,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    resetErrors: (): void => {
      dispatch(resetErrors());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);
