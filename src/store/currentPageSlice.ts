import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentPageState } from './types';
import { Person } from '../types';

const initialState: CurrentPageState = {
  list: [],
  totalItems: 0,
  isLoading: true,
};

export const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState: initialState,
  reducers: {
    setCurrentPersons(state, action: PayloadAction<Array<Person>>) {
      state.list = action.payload;
    },
    setTotalItems(state, action: PayloadAction<number>) {
      state.totalItems = action.payload;
    },
  },
});

export const { setCurrentPersons, setTotalItems } = currentPageSlice.actions;
export const currentPagesReducer = currentPageSlice.reducer;
