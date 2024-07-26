import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersonsState } from './types';
import { Person } from '../types';

const initialState: PersonsState = {
  list: [],
};

export const personSelectedSlice = createSlice({
  name: 'selectedPersons',
  initialState: initialState,
  reducers: {
    toggleSelected(state, action: PayloadAction<Person>) {
      const index = state.list.findIndex((p) => p.name === action.payload.name);
      if (index >= 0) {
        state.list.splice(index, 1);
      } else {
        state.list.push(action.payload);
      }
    },
    unselectAll(state) {
      state.list = [];
    },
  },
});

export const { toggleSelected, unselectAll } = personSelectedSlice.actions;
export const selectedPersonsReducer = personSelectedSlice.reducer;
