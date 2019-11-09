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

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  secondName: string;
  phone: string;
}

export interface Order {
  customerId: string;
  date: string;
}
