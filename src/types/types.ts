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
  owner: string;
  name: string;
  ownerId: string;
  description: string;
  price: number;
  requirements: {
    option: string;
    value: string;
  }[];
  publisher: string;
  releaseDate: string;
  sliderImage: string;
  defaultImage: string;
  rating: number;
  genres: string[];
}
