import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  value: SidebarToggleState;
};

type SidebarToggleState =
  | 'all'
  | 'on-duty'
  | 'enroute-for-pickup'
  | 'at-pickup'
  | 'in-transit'
  | 'at-unloading'
  | 'empty-movement'
  | 'maintenance'
  | 'off-duty'
  | 'available-vehicles';

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
