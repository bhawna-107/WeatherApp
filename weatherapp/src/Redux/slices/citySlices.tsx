// In your Redux slice file (e.g., citySlice.ts)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface City {
  name: string;
  temperature: number;
}

interface CityState {
  cities: City[];
}

const initialState: CityState = {
  cities: [],
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    addCity(state, action: PayloadAction<City>) {
      const existingCity = state.cities.find(city => city.name === action.payload.name);
      if (!existingCity) {
        if (state.cities.length >= 5) {
          state.cities.pop(); // Remove the oldest search if there are already 5 searches
        }
        state.cities.unshift(action.payload); // Add the new search to the beginning
      }
    },
    removeCity(state, action: PayloadAction<string>) {
      state.cities = state.cities.filter(city => city.name !== action.payload);
    },
  },
});

export const { addCity, removeCity } = citySlice.actions;

export default citySlice.reducer;
