import { configureStore } from '@reduxjs/toolkit';
import cityReducer from '../Redux/slices/citySlices';

export const store = configureStore({
    reducer: {
        city: cityReducer,
    },
})

