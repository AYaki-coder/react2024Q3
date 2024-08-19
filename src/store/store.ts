import { configureStore } from '@reduxjs/toolkit';
import { dataSliceReducer } from './dataSlice';

const store = configureStore({
  reducer: {
    data: dataSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
