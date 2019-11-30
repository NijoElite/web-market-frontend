import React, { FC } from 'react';
import { Container } from '../../ui-kit/Container/Container.component';

const CabinetLayout: FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default CabinetLayout;
