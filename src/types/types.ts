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
