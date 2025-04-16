export interface SignUpFormData {
  email: string;
  checkedEmailNumber: string;
  password: string;
  checkedPassword: string;
  name: string;
  phoneNum: {
    first: number;
    middle: number;
    last: number;
  };
  birth: {
    year: string;
    month: string;
    day: string;
  };
  agreeAll: boolean;
  age14: boolean;
  terms: boolean;
  privacy: boolean;
  favoriteGame: string;
}