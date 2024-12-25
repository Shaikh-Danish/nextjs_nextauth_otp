import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  value: SidebarToggleState;
};

type SidebarToggleState = boolean;

const initialState = {
  value: false,
} as InitialState;

export const sidebarToggle = createSlice({
  name: 'sidebarToggle',
  initialState,
  reducers: {
    toggle: state => {
      state.value = !state.value;
    },
  },
});

export const { toggle } = sidebarToggle.actions;

export default sidebarToggle.reducer;
