export type PersonalContact = {
  id: number;
  name: string;
  phone: string;
  isFavorite?: boolean;
};

export type BusinessContact = {
  id: number;
  contactPerson: string;
  email: string;
  company: string;
  isFavorite?: boolean;
};
