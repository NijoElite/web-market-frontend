import { FC, useState, useEffect } from 'react';
import { Product } from '../../../services/Product/types';
import React from 'react';
import { ProductApi } from '../../../services/Product/ProductApi';
import { Headline } from '../../../components/Headline/Headline.component';
import { Table, TableRow, TableCell } from '../../../components/Table/Table.component';
import { Currency } from '../../../components/Currency/Currency.component';

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
  console.log(products);
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
            </TableRow>
          );
        })}
      </Table>
    </React.Fragment>
  );
};
