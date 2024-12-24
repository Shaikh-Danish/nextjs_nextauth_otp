import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  value: {
    phone: number;
    name: string;
  } | null;
};

const initialState = {
  value: null,
} as InitialState;

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const {} = user.actions;

export default user.reducer;
