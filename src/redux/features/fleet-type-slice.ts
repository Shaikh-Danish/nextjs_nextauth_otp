import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  value: FleetStatus | 'all';
};

const initialState = {
  value: 'all',
} as InitialState;

export const selectedfleetType = createSlice({
  name: 'selectedfleetType',
  initialState,
  reducers: {
    setFleetSelectedType: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setFleetSelectedType } = selectedfleetType.actions;

export default selectedfleetType.reducer;
