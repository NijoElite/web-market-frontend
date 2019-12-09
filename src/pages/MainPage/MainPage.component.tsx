import { Catalog } from '../../components/Catalog/Catalog.component';
import { Container } from '../../components/Container/Container.component';
import { Carousel } from '../../components/Carousel/Carousel.component';
import styled from '@emotion/styled/macro';
import React, { FC, useEffect, useState } from 'react';
import { Product } from '../../services/Product/types';
import { ProductApi } from '../../services/Product/ProductApi';

const CarouselStyled = styled(Carousel)`
  width: 100%;
  height: 500px;
`;

const mockCarousel = ['https://cdn.gabestore.ru/category/yZX_l6hOvLAz_3TnSUk5jLr03hcObcAB.jpg'];

const Background = styled('div')<{ imgUrl: string }>`
  background-image: url(${({ imgUrl }): string => imgUrl});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
`;

export const MainPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      const response = await ProductApi.getLatest();

      if (response.status === 'success') {
        setProducts(response.data);
      }
    };

    fetchProducts();
  }, []);

  const carouselItems = products.map(product => {
    console.log('/' + product.sliderImage);
    return {
      item: <div></div>,
      background: <Background imgUrl={'/' + product.sliderImage} />,
    };
  });

  return (
    <React.Fragment>
      <CarouselStyled items={carouselItems} options={{ delay: 8500 }} />
      <Container>
        <Catalog />
      </Container>
    </React.Fragment>
  );
};
