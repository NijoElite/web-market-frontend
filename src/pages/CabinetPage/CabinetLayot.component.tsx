import React, { FC, useEffect, useState } from 'react';
import { Container } from '../../ui-kit/Container/Container.component';
import { UserApi } from '../../services/User/UserApi';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import styled from '@emotion/styled/macro';
import { Link } from 'react-router-dom';

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
  customer: ['Продавец', '/cabinet/customer'],
};

interface StateProps {
  userId?: string;
}

type Props = StateProps;

const CabinetLayout: FC<Props> = ({ children, userId }) => {
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [isFetched, setFetched] = useState(false);

  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      const response = await UserApi.getUser(userId || '');
      setFetched(true);

      if (response.status === 'success') {
        setUserRoles(response.data.user.role);
      }
    };

    if (!isFetched) {
      fetchUserData();
    }
  });

  return (
    <Container>
      <RolesPanel>
        {userRoles.map(role => (
          <RoleButton to={links[role][1]}>{links[role][0]}</RoleButton>
        ))}
      </RolesPanel>
      {children}
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

export default connect(mapStateToProps)(CabinetLayout);
