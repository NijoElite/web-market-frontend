import React, { FC, useState } from 'react';
import { Headline } from '../../../components/Headline/Headline.component';
import styled from '@emotion/styled';
import { useFormik } from 'formik';
import dayjs from 'dayjs';
import { Input } from '../../../components/Form/Input/Input.component';
import { Block } from '../../../components/Block/Block.component';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Button } from '../../../components/Button/Button.component';
import { ProductApi } from '../../../services/Product/ProductApi';
import { Redirect } from 'react-router';

dayjs.extend(customParseFormat);

const FormStyled = styled.form`
  padding: 25px 15px;
`;

interface ProductFormFields {
  name: string;
  description: string;
  price: string;
  requirements: string;
  publisher: string;
  releaseDate: string;
  genres: string;
}

interface ProductFormProps {
  onSubmit: (fields: ProductFormFields) => void;
}

const validate = (values: ProductFormFields): Partial<ProductFormFields> => {
  const errors: Partial<ProductFormFields> = {};

  if (!values.description) {
    errors.description = 'Обязательное поле';
  }
  if (!values.name) {
    errors.name = 'Обязательное поле';
  }
  if (!values.price) {
    errors.price = 'Обязательное поле';
  } else if (isNaN(+values.price) || +values.price <= 0) {
    errors.price = 'Введите положительное число';
  }
  if (!values.requirements) {
    errors.requirements = 'Обязательное поле';
  }

  if (!values.genres) {
    errors.genres = 'Обязательное поле';
  }
  if (!values.publisher) {
    errors.publisher = 'Обязательное поле';
  }

  if (!values.releaseDate) {
    errors.releaseDate = 'Обязательное поле';
  } else if (!/^([0-2][0-9]|(3)[0-1])(\.)(((0)[0-9])|((1)[0-2]))(\.)\d{4}$/.test(values.releaseDate)) {
    errors.releaseDate = 'Неправильный формат';
  }

  return errors;
};

const ProductForm: FC<ProductFormProps> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '500',
      requirements: '',
      publisher: '',
      releaseDate: dayjs(Date.now()).format('DD.MM.YYYY'),
      genres: '',
    },
    validate,
    onSubmit: onSubmit,
  });

  return (
    <FormStyled onSubmit={formik.handleSubmit}>
      <Input
        id="name"
        name="name"
        type="text"
        labelText="Название"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        isValid={!formik.errors.name}
        errorMessage={formik.errors.name}
      />
      <Input
        id="price"
        name="price"
        type="text"
        labelText="Цена (в рублях)"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.price}
        isValid={!formik.errors.price}
        errorMessage={formik.errors.price}
      />
      <Input
        id="publisher"
        name="publisher"
        type="text"
        labelText="Издатель"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.publisher}
        isValid={!formik.errors.publisher}
        errorMessage={formik.errors.publisher}
      />
      <Input
        id="releaseDate"
        name="releaseDate"
        type="text"
        labelText="Дата релиза (ДД.ММ.ГГГГ)"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.releaseDate}
        isValid={!formik.errors.releaseDate}
        errorMessage={formik.errors.releaseDate}
      />
      <Input
        id="genres"
        name="genres"
        type="text"
        labelText="Жанры (через запятую)"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.genres}
        isValid={!formik.errors.genres}
        errorMessage={formik.errors.genres}
      />
      <Input
        id="requirements"
        name="requirements"
        type="text"
        labelText="Требования (ключ: значение, через запятую)"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.requirements}
        isValid={!formik.errors.requirements}
        errorMessage={formik.errors.requirements}
      />
      <Input
        id="description"
        name="description"
        type="text"
        labelText="Описание"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
        isValid={!formik.errors.description}
        errorMessage={formik.errors.description}
      />
      <Button type="submit">Добавить</Button>
    </FormStyled>
  );
};

export const NewProduct: FC = () => {
  const [isCreated, setCreated] = useState(false);

  const handleSubmit = async (fields: ProductFormFields): Promise<void> => {
    console.log(fields);
    const response = await ProductApi.createProduct({
      description: fields.description,
      genres: fields.genres.split(','),
      name: fields.name,
      price: +fields.price,
      publisher: fields.publisher,
      releaseDate: dayjs(fields.releaseDate, 'DD.MM.YYYY').toISOString(),
      requirements: fields.requirements.split(',').map(req => {
        const [option, value] = req.split(':');
        return { option, value };
      }),
    });

    if (response.status === 'success') {
      setCreated(true);
    }
  };

  if (isCreated) {
    return <Redirect to="/cabinet/seller" />;
  }

  return (
    <React.Fragment>
      <Headline>Добавить новый товар</Headline>
      <Block>
        <ProductForm onSubmit={handleSubmit} />
      </Block>
    </React.Fragment>
  );
};
