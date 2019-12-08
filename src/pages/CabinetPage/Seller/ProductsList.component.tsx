import { FC, useState, useEffect } from 'react';
import { Product } from '../../../services/Product/types';
import React from 'react';
import { ProductApi } from '../../../services/Product/ProductApi';
import { Headline } from '../../../components/Headline/Headline.component';
import { Table, TableRow, TableCell } from '../../../components/Table/Table.component';
import { Currency } from '../../../components/Currency/Currency.component';
import { Button } from '../../../components/Button/Button.component';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled/macro';

const TableCellStyled = styled(TableCell)`
  display: flex;
  justify-content: flex-end;

  > *:not(:first-child) {
    margin-left: 15px;
  }
`;

export const ProductsList: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async (): Promise<void> => {
    const response = await ProductApi.getOwn();

    if (response.status === 'success') {
      setProducts(response.data);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteClick = async (article: string): Promise<void> => {
    const response = await ProductApi.removeFromSale(article);

    if (response.status === 'success') {
      const updatedProducts = products.map(product => (product.article === article ? response.data : product));
      setProducts(updatedProducts);
    }
  };

  return (
    <React.Fragment>
      <Headline>Ваши товары</Headline>
      <Table>
        {products.map(product => {
          return (
            <TableRow>
              <TableCell description="Название">{product.name}</TableCell>
              <TableCell description="Артикул">{product.article}</TableCell>
              <TableCell description="Цена">
                {product.price}
                <Currency type="rub" />
              </TableCell>
              <TableCell description="Издатель">{product.publisher}</TableCell>
              <TableCell description="В продаже">{product.isOnSale === 'true' ? 'Да' : 'Нет'}</TableCell>
              <TableCellStyled>
                <Link to={`/cabinet/stats/${product.article}`}>
                  <Button>Статистика</Button>
                </Link>
                <div>
                  <Button onClick={(): Promise<void> => handleDeleteClick(product.article)}>Убрать</Button>
                </div>
              </TableCellStyled>
            </TableRow>
          );
        })}
      </Table>
    </React.Fragment>
  );
};
