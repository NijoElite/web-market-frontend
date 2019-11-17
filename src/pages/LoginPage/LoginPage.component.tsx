import styled from '@emotion/styled/macro';
import React, { FC } from 'react';
import { LoginForm, LoginFormFields } from '../../components/Forms/LoginForm/LoginForm.component';
import { Container } from '../../ui-kit/Container/Container.component';
import { mediaMd } from '../../utils/css.utils';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { login } from '../../store/system/actions';
import { AppState } from '../../store';
import { Redirect } from 'react-router';

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

// #region props
interface DispatchProps {
  login: (username: string, password: string) => void;
}

interface StateProps {
  jwt?: string;
}

type Props = DispatchProps & StateProps;
// #endregion

const LoginPage: FC<Props> = ({ login, jwt }) => {
  const handleSubmit = async (values: LoginFormFields): Promise<void> => {
    login(values.email, values.password);
  };

  if (jwt) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <LoginPageStyled>
        <LoginForm onSubmit={handleSubmit} />
      </LoginPageStyled>
    </Container>
  );
};

// #region Map To Props
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
  return {
    login: (username, password): void => {
      dispatch(login(username, password));
    },
  };
};

const mapStateToProps = (root: AppState): StateProps => {
  return {
    jwt: root.system.jwt,
  };
};
// #endregion

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
