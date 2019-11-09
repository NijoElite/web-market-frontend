import React, { FC } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

interface BurgerProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  className?: string;
}

export const Burger: FC<BurgerProps> = ({open, setOpen, className}) => {
  const openButton =  <FontAwesomeIcon icon={faBars}/>;
  const closeButton = <FontAwesomeIcon icon={faTimes}/>;

  return (
  <div className={className} onClick={(): void => setOpen(!open)}> 
    {open ? closeButton : openButton}
  </div>);
}
