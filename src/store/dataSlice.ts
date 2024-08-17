import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataForRender } from '../types';
import { DataState } from './types';

export const initialState: DataState = {
  list: [],
};

export const dataSlice = createSlice({
  name: 'formData',
  initialState: initialState,
  reducers: {
    addData(state: DataState, action: PayloadAction<DataForRender>) {
      state.list.push(action.payload);
    },
  },
});

export const { addData } = dataSlice.actions;
export const dataSliceReducer = dataSlice.reducer;
