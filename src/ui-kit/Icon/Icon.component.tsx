import React, { FC, memo } from 'react';
import css, { SerializedStyles } from '@emotion/css';
import styled from '@emotion/styled/macro'

const StyledSpan = styled('span')<{unicodeChar: string; fontSize: string}>`
  ${({unicodeChar, fontSize}): SerializedStyles => {
    return css`
      &:before{
        font-family: 'iconic';
        display: block;
        content: '${unicodeChar}';
        font-size: ${fontSize};
      }
    `;
  }}
`;

interface IconProps {
  unicodeChar: string;
  className?: string;
  fontSize?: string;
}

export const Icon: FC<IconProps> = memo(({unicodeChar, className, fontSize = '1em'}) => {
  return (<StyledSpan className={className} unicodeChar={unicodeChar} fontSize={fontSize}/>)
});

