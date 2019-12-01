import React, { FC, useEffect, useState } from 'react';
import { Container } from '../../components/Container/Container.component';
import { UserApi } from '../../services/User/UserApi';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import styled from '@emotion/styled/macro';
import { Link, useRouteMatch, Switch, Route } from 'react-router-dom';
import SellerCabinet from './Seller/SellerCabinet.component';
import UserCabinet from './User/UserCabinet.component';

// #region styled
const RolesPanel = styled.div`
  display: flex;
  margin-top: 20px;
`;

const RoleButton = styled(Link)`
  padding: 8px 20px;
  background: #fff;
  border-radius: 20px;
  margin-right: 15px;
  text-decoration: none;
  color: #000;
  transition: all 0.1s linear;

  &:hover {
    background: #ffc608;
  }
`;
// #endregion

const links: { [key: string]: [string, string] } = {
  user: ['Пользователь', '/cabinet'],
  admin: ['Администратор', '/cabinet/admin'],
  seller: ['Продавец', '/cabinet/seller'],
  customer: ['Продавец', '/cabinet/seller'], // TODO: remove
};

interface StateProps {
  userId?: string;
}

type Props = StateProps;

const Cabinet: FC<Props> = ({ userId }) => {
  const [userRoles, setUserRoles] = useState<string[]>([]);

  const match = useRouteMatch();

  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      const response = await UserApi.getUser(userId || '');

      if (response.status === 'success') {
        console.log(response);
        console.log('set user roles', response.data.user.role);
        setUserRoles(response.data.user.role);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <Container>
      <RolesPanel>
        {userRoles.map(role => (
          <RoleButton to={links[role][1]}>{links[role][0]}</RoleButton>
        ))}
      </RolesPanel>
      {!match ? (
        <div>404</div>
      ) : (
        <Switch>
          <Route path={`${match.url}/seller`} component={SellerCabinet} />
          <Route path={`${match.url}/`} exact component={UserCabinet} />}
        </Switch>
      )}
    </Container>
  );
};

// #region Map to Props
const mapStateToProps = (root: AppState): StateProps => {
  return {
    userId: root.system.userId,
  };
};

// #endregion

export default connect(mapStateToProps)(Cabinet);
