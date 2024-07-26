import { configureStore } from '@reduxjs/toolkit';
import { selectedPersonsReducer } from './personSelectedSlice';
import { personsApi } from './personsApi';
import { currentPagesReducer } from './currentPageSlice';
import { detailedPersonReducer } from './detailedPersonSlice';

const store = configureStore({
  reducer: {
    selectedPersons: selectedPersonsReducer,
    currentPage: currentPagesReducer,
    detailedPerson: detailedPersonReducer,
    [personsApi.reducerPath]: personsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(personsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
