import { Product } from '../../types/types';
import { Catalog } from '../../components/Catalog/Catalog.component';
import { Container } from '../../ui-kit/Container/Container.component';
import { Carousel } from '../../ui-kit/Carousel/Carousel.component';
import styled from '@emotion/styled/macro';
import React, { FC } from 'react';

const CarouselStyled = styled(Carousel)`
  width: 100%;
  height: 500px;
`;

const mockData: Product = {
  name: 'Game Of Year',
  article: '123',
  defaultImage: 'https://cdn.gabestore.ru/product/370x460_7JGDxDgU4NZUu_vqCqVMPF4VNWMG8BrB.jpg',
  description: 'fdghsftjsrj',
  price: 500,
  ownerId: '',
  requirements: [],
  publisher: '',
  sliderImage: '',
  rating: 5,
  owner: '',
  releaseDate: '',
  genres: [],
};

const mockCarousel = ['https://cdn.gabestore.ru/category/yZX_l6hOvLAz_3TnSUk5jLr03hcObcAB.jpg'];

const Background = styled('div')<{ imgUrl: string }>`
  background-image: url(${({ imgUrl }): string => imgUrl});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
`;

const Item: FC = () => <div>ghderfhsetrjsj</div>;

const games = [mockData];

export const MainPage: FC = () => {
  const items = mockCarousel.map(el => {
    return {
      item: <Item />,
      background: <Background imgUrl={el} />,
    };
  });

  return (
    <React.Fragment>
      <CarouselStyled items={items} options={{ delay: 8500 }} />
      <Container>
        <Catalog games={games} />
      </Container>
    </React.Fragment>
  );
};
