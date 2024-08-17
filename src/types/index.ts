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
}
