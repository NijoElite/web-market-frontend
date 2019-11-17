import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../store/system/actions';
import { Dispatch } from 'redux';
import { Redirect } from 'react-router-dom';

// #region props
interface DispatchProps {
  logout: () => void;
}

type Props = DispatchProps;
// #endregion

const LogoutPage: FC<Props> = ({ logout }) => {
  useEffect(() => {
    logout();
  });

  return <Redirect to="/" />;
};

// #region Map To Props
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    logout: (): void => {
      dispatch(logout());
    },
  };
};
// #endregion

export default connect(null, mapDispatchToProps)(LogoutPage);
