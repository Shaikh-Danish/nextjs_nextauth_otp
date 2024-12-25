import { configureStore } from '@reduxjs/toolkit';
import { useSelector, type TypedUseSelectorHook } from 'react-redux';

import userReducer from './features/user-slice';
import sidebarToggleReducer from './features/sidebar-toggle-slice';
import fleetTypeReducer from './features/fleet-type-slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    sidebarToggle: sidebarToggleReducer,
    fleetType: fleetTypeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
