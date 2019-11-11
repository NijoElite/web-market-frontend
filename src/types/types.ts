export interface UserPartialInfo {
  id: string;
  firstName: string;
  lastName: string;
  secondName: string;
  phone: string;
}

export interface UserFullInfo extends UserPartialInfo {
  birthday: string;
  email: string;
}

export interface Product {
  article: string;
  ownerId: string;
  name: string;
  description: string;
  price: number;
  requirements: {
    option: string;
    value: string;
  }[];
  publisher: string;
  defaultImage: string;
  sliderImage: string;
  rating: number;
}
