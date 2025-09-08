export type PersonalContact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  relation: string;
  isFavorite?: boolean;
};

export type BusinessContact = {
  id: number;
  contactPerson: string;
  email: string;
  company: string;
  isFavorite?: boolean;
};
