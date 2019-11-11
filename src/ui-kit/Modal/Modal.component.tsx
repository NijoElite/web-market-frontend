import React, { FC, Children } from 'react';
import styled from '@emotion/styled/macro';
import css from '@emotion/css';

// #region styled
const fullscreen = css`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  top: 0;
`;

const ModalWrapperStyled = styled('div')<{show?: boolean}>`
  ${fullscreen}
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({show}): string => show ? '1' : '0'};
  visibility: ${({show}): string => show ? 'visible' : 'hidden'};
  transition: all linear 0.1s;
  z-index: 1000;
`;

const ModalStyled = styled.div`
  background: #fff;
  padding: 25px 30px;
  min-height: 300px;
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  z-index: 1000;
`;

const ModalBackgroundStyled = styled('div')<{show?: boolean; clickable?: boolean}>`
  ${fullscreen}
  background: #000;
  opacity: ${({show}): string => show ? '0.72' : '0'};
  visibility: ${({show}): string => show ? 'visible' : 'hidden'};
  transition: all linear 0.1s;
  cursor: ${({clickable}): string => clickable ? 'pointer' : 'auto'};
`;

const TitleStyled = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

const BodyStyled = styled.div`
  font-size: 16px;
  padding: 40px 0;
  border-top: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;
`;

const FooterStyled = styled.div`
  display: flex;
  justify-content: flex-end;

  & > :not(:last-child) {
    margin-right: 15px;    
  }
`;
// #endregion

interface ModalProps {
  show?: boolean;  
  children?: React.ReactNode;
  onBackClick?(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

const Title: FC = ({children}) => {
  return <TitleStyled>{children}</TitleStyled>  
}

const Body: FC = ({children}) => {
  return <BodyStyled>{children}</BodyStyled>  
}

const Footer: FC = ({children}) => {
  return <FooterStyled>{children}</FooterStyled>  
}

export class Modal extends React.Component<ModalProps> {
  static Title = Title;
  static Body = Body;
  static Footer = Footer;

  render(): React.ReactNode { 
    return (
    <React.Fragment>
      <ModalWrapperStyled show={this.props.show}>
        <ModalBackgroundStyled show={this.props.show} onClick={this.props.onBackClick} clickable={!!this.props.onBackClick}/>
        <ModalStyled>{this.props.children}</ModalStyled>
      </ModalWrapperStyled>
    </React.Fragment>  
  )
  }
}
