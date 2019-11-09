import styled from '@emotion/styled/macro';
import React, { FC } from 'react';

type fieldType = 'button' | 'checkbox' | 'file' | 'hidden' | 'image' | 'password' | 'radio' | 'reset' | 'submit' | 'text';

interface FormProps {
  fields: {name: string; type: fieldType}[];
}

interface FormState {

}

export const Form: FC = () => {
  return <form action="">fdh</form>
}