import React, { FC } from 'react';
import styled from '@emotion/styled/macro';
import { transition } from '../../utils/css.utils';

// #region styled
const TableRowStyled = styled.div`
  width: 100%;
  display: flex;
  background: #fff;
  padding: 15px 25px;
  justify-content: space-between;
  flex-wrap: wrap;
  background: transparent;
  border-radius: 15px;
  ${transition('all')}

  &:not(:last-child) {
    margin-bottom: 25px;
  }
`;

const TableCellStyled = styled('div')<{ description?: string }>`
  flex-basis: 0;
  flex-grow: 1;
  font-size: 16px;

  &:after {
    content: '${({ description }): string => description || ''}';
    display: block;
    font-size: 12px;
  }
`;

const TableStyled = styled.div`
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;

  > ${TableRowStyled} {
    background: #fff;
  }
`;

const DropTableStyled = styled('div')`
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  padding: 15px 0;
  width: 100%;

  > ${TableRowStyled}:hover {
    background: #ffc608;
  }
`;
// #endregion

interface NestedTableProps {
  className?: string;
  children?: React.ReactNode;
}

export const Table: FC<NestedTableProps> = ({ className, children }) => {
  return <TableStyled className={className}>{children}</TableStyled>;
};

interface TabelCellProps {
  className?: string;
  description?: string;
  children?: React.ReactNode;
}

export const TableCell: FC<TabelCellProps> = ({ children, description, className }) => {
  return (
    <TableCellStyled description={description} className={className}>
      {children}
    </TableCellStyled>
  );
};

interface TabelRowProps {
  className?: string;
  children?: React.ReactNode;
}

export const TableRow: FC<TabelRowProps> = ({ children, className }) => {
  return <TableRowStyled className={className}>{children}</TableRowStyled>;
};

interface DropTableRowProps {
  className?: string;
  children?: React.ReactNode;
}

export const DropTable: FC<DropTableRowProps> = ({ children, className }) => {
  return <DropTableStyled className={className}>{children}</DropTableStyled>;
};
