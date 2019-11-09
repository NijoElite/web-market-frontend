import styled from '@emotion/styled/macro';

export const Button = styled('button')<{small?: boolean}>`
  background: none;
  border: 1px solid #ffc608;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: 0.1s linear;
  display: inline-block;
  text-align: center;
  color: #000000;

  ${({small}): string => small ? 'padding: 5px 10px;' : ''}

  &:hover {
    background: #ffc608;
    color: #000000;
    text-decoration: none;
  }
`;