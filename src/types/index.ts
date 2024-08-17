export const enum Endpoints {
  Main = '/',
  ControlledForm = '/controlled-form',
  UncontrolledForm = '/uncontrolled-form',
}

export const enum Links {
  Main = 'Main',
  ControlledForm = 'Controlled Form',
  UncontrolledForm = 'Uncontrolled Form',
}

export interface FormErrors {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  terms: string;
  picture: string;
}

export interface CardFormData {
  terms?: true | undefined;
  name: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
  gender: string;
  country: string;
  picture: FileList;
}

export interface DataForRender {
  date: string;
  terms: true;
  name: string;
  email: string;
  age: number;
  password: string;
  gender: string;
  country: string;
  picture: string;
}
