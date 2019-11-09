import React, { FC, useState, useEffect} from "react";
import styled from '@emotion/styled/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import css from "@emotion/css";
import { transition } from "../../utils/css.utils";

// #region styled
  const NavBtn = css`
    ${transition('color', 'background')}

    display: block;
    border-radius: 50%;
    position: absolute;
    width: 44px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    color: #333;
    font-size: 24px;
    cursor: pointer;

    &:hover {
      color: #fff;
      background: #000;
    }
  `;

  const NextBtnStyled = styled.div`
    ${NavBtn}
    right: 15px;
    top: 50%;
    transform: translateY(-50%);

    & > * {
      position: relative;
      left: 2px;
    }
  `;  

  const PrevBtnStyled = styled.div`
    ${NavBtn}
    left: 15px;
    top: 50%;
    transform: translateY(-50%);  

    & > * {
      position: relative;
      right: 2px;
    }
  `;  

  const DotStyled = styled('div')<{isActive: boolean}>`
    ${transition('background')}
    display: block;
    border-radius: 50%;
    width: 11px;
    height: 11px;
    margin: 0 5px;
    cursor: pointer;
    background: ${({isActive}): string => isActive ? '#ffc608' : '#f1f1f1'};

    &:hover {
      background: #ffc608;
    }
  `;  

  const DotListStyled = styled.div`
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
  `;  

  const WrapperStyled = styled.div`
    position: relative;
    overflow: hidden;
  `;

  const CarouselItemWrapper = styled('div')<{isVisible: boolean}>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    visibility: ${({isVisible}): string => isVisible? 'visible' : 'hidden'};
    opacity: ${({isVisible}): string => isVisible? '1' : '0'};
    transition: visibility 0.5s ease, opacity 0.5s ease;
  `;

  const BackgroundWrapper = styled('div')<{isVisible: boolean}>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    transform: scale(${({isVisible}): string => isVisible? '1' : '1.2'});
    transition: transform 7.5s linear;
  `;

  const ItemWrapper = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  `;
// #endregion

interface DotProps {
  index: number;
  isActive: boolean;
  className?: string;
  setIndex(i: number): void;
}

const Dot: FC<DotProps> = ({index, className, setIndex, isActive}) => {
  return <DotStyled className={className} isActive={isActive} onClick={(): void => setIndex(index)}/>;
}

interface CarouseItem {
  item: React.ReactNode;
  background?: React.ReactNode;
}

interface CarouselProps  {
  items: CarouseItem[];
  className?: string;
  options?: CarouselOptions;
}

interface CarouselOptions {
  delay?: number;  
}

export const Carousel: FC<CarouselProps> = ({items, className, options}) => {
  const [curIndex, setIndex] = useState(0);
  const dots: React.ReactNode[] = [];

  const setPrevIndex = (): void => setIndex((items.length + curIndex - 1) % items.length);
  const setNextIndex = (): void => setIndex((curIndex + 1) % items.length);

  for (let i = 0; i < items.length; i++) {
    dots.push(<Dot index={i} key={i} setIndex={setIndex} isActive={i === curIndex}/>)
  }

  useEffect(() => {
    if (options && options.delay) {  
      const interval = setInterval(setNextIndex, options.delay);

      return (): void => clearInterval(interval);
    }
  });

  return(
    <WrapperStyled className={className}>
      {items.map((item, i) => (
        <CarouselItemWrapper key={i} isVisible={i===curIndex}>
          <BackgroundWrapper isVisible={i===curIndex}>{item.background}</BackgroundWrapper>
          <ItemWrapper>{item.item}</ItemWrapper>
        </CarouselItemWrapper>)
      )}

      <PrevBtnStyled onClick={setPrevIndex}>
        <FontAwesomeIcon icon={faChevronLeft}/>
      </PrevBtnStyled>
      <NextBtnStyled onClick={setNextIndex}>
        <FontAwesomeIcon icon={faChevronRight}/>
      </NextBtnStyled>

      <DotListStyled>
        {dots}
      </DotListStyled>
    </WrapperStyled>
  );
}