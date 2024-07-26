import { Person } from '../types';

export interface PersonsState {
  list: Person[];
}

export interface CurrentPageState {
  list: Person[];
  totalItems: number;
  isLoading: boolean;
}
