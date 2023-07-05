import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import store, { RootState } from './index';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
